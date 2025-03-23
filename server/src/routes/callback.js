// Require Dependencies
const express = require("express");
const router = express.Router();
const colors = require("colors");
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const config = require("../config");
const mongoose = require("mongoose");

const User = require("../models/User");
const CryptoTransaction = require("../models/CryptoTransaction");
const insertNewWalletTransaction = require("../utils/insertNewWalletTransaction");
const { checkAndApplyAffiliatorDeposit } = require("../controllers/affiliates");
const { convertCoinsToUSD, checkDepositStatus } = require("../controllers/oxapay");

// Rate limiting middleware - more lenient for OXAPay
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300, // limit each IP to 300 requests per 5 minutes
  message: { error: 'Too many requests, please try again later' }
});

// Verify OXAPay webhook signature
function verifyWebhookSignature(req) {
  const hmac = req.headers['hmac'];
  if (!hmac) {
    console.error('Missing HMAC signature in headers:', req.headers);
    throw new Error('Missing HMAC signature');
  }

  const rawBody = JSON.stringify(req.body);
  
  // Use different secret key based on webhook type
  const secretKey = req.body.type === 'payout' 
    ? config.authentication.oxapay.payout
    : config.authentication.oxapay.merchant;

  const calculatedHmac = crypto
    .createHmac('sha512', secretKey)
    .update(rawBody)
    .digest('hex');

  if (hmac !== calculatedHmac) {
    console.error('HMAC verification failed:');
    console.error('Received HMAC:', hmac);
    console.error('Calculated HMAC:', calculatedHmac);
    console.error('Raw body:', rawBody);
    console.error('Using key for type:', req.body.type);
    throw new Error('Invalid HMAC signature');
  }
}

// Validate transaction data
function validateTransaction(txData) {
  const { status, address, payCurrency, receivedAmount } = txData;
  
  if (!status || !address || !payCurrency || !receivedAmount) {
    throw new Error('Missing required transaction fields');
  }

  if (typeof receivedAmount !== 'string' || isNaN(parseFloat(receivedAmount))) {
    throw new Error('Invalid received amount');
  }

  const supportedCurrencies = ['BTC', 'ETH', 'LTC', 'SOL', 'USDT', 'USDC'];
  if (!supportedCurrencies.includes(payCurrency.toUpperCase())) {
    throw new Error('Unsupported currency');
  }
}

// JSON parsing error handler
router.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Parse Error:', err.message);
    console.log('Raw body:', req.rawBody);
    return res.status(400).json({ 
      error: 'Invalid JSON payload',
      details: err.message 
    });
  }
  next(err);
});

// Request logging middleware with sensitive data masking
router.use((req, res, next) => {
  const maskedBody = { ...req.body };
  if (maskedBody.address) maskedBody.address = `${maskedBody.address.slice(0,6)}...${maskedBody.address.slice(-4)}`;
  if (maskedBody.txID) maskedBody.txID = `${maskedBody.txID.slice(0,6)}...${maskedBody.txID.slice(-4)}`;
  
  console.log(`\n=== CALLBACK ROUTE HIT ${new Date().toISOString()} ===`);
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Parsed body (masked):', maskedBody);
  next();
});

/**
 * @route   POST /api/callback/oxapay
 * @desc    Process OXAPay IPN
 * @access  Public
 */
router.post('/oxapay', limiter, async (req, res, next) => {
  const startTime = Date.now();
  console.log(`\n=== OXAPAY CALLBACK ${new Date().toISOString()} ===`);
  
  try {
    // Verify webhook signature
    verifyWebhookSignature(req);

    const { type } = req.body;
    if (type !== 'payment') {
      return res.sendStatus(200);
    }

    // Validate transaction data
    validateTransaction(req.body);

    const { txID, status, address, payCurrency, receivedAmount, trackId } = req.body;
    console.log('\nProcessing payment:', { 
      txID: `${txID.slice(0,6)}...${txID.slice(-4)}`,
      status,
      address: `${address.slice(0,6)}...${address.slice(-4)}`,
      payCurrency,
      receivedAmount,
      trackId
    });

    // Convert currency to lowercase for matching
    const currencyKey = payCurrency.toLowerCase();

    // Get user who made this deposit by checking all possible currency addresses
    const user = await User.findOne({
      $or: [
        { "crypto.btc.address": address },
        { "crypto.eth.address": address },
        { "crypto.ltc.address": address },
        { "crypto.sol.address": address },
        { "crypto.usdt.address": address },
        { "crypto.usdc.address": address }
      ]
    }).select('_id wallet wagerNeededForWithdraw').lean();

    console.log('\nUser lookup result:', user ? {
      id: user._id,
      currentWallet: user.wallet,
      wagerNeeded: user.wagerNeededForWithdraw
    } : 'Not found');

    if (!user) {
      console.log(colors.blue("OXAPay >> Not a site deposit"));
      return res.sendStatus(200);
    }

    // Convert received amount to USD with validation
    const exchangedAmount = convertCoinsToUSD(receivedAmount, payCurrency.toUpperCase());
    if (!exchangedAmount || exchangedAmount <= 0 || exchangedAmount > 10000) { // Add reasonable maximum
      throw new Error('Invalid exchange amount');
    }
    console.log('\nAmount conversion:', { receivedAmount, payCurrency, exchangedAmount });

    // Use session for atomic operations
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
      // Look for existing transaction
      let transaction = await CryptoTransaction.findOne({
        $or: [
          { txid: txID },
          { tid: trackId }
        ]
      }).session(session);

      if (transaction?.state === 3) {
        console.log('Transaction already completed:', transaction._id);
        await session.commitTransaction();
        return res.sendStatus(200);
      }

      if (transaction) {
        if (status === "Paid" && transaction.state !== 3) {
          transaction.state = 3;
          await transaction.save({ session });
          await creditUser(user, exchangedAmount, transaction._id, session);
        }
      } else if (status === "Confirming") {
        // Only create new transaction for Confirming status
        transaction = new CryptoTransaction({
          type: "deposit",
          currency: payCurrency,
          siteValue: exchangedAmount,
          cryptoValue: receivedAmount,
          address,
          tid: trackId,
          txid: txID,
          state: 1,
          _user: user._id,
        });
        await transaction.save({ session });
      } else if (status === "Paid") {
        // For Paid status without existing transaction, verify with OXAPay
        console.log('\nReceived Paid status without existing transaction, verifying with OXAPay...');
        const paymentStatus = await checkDepositStatus(trackId);
        
        if (paymentStatus && paymentStatus.status === "Paid") {
          transaction = new CryptoTransaction({
            type: "deposit",
            currency: payCurrency,
            siteValue: exchangedAmount,
            cryptoValue: receivedAmount,
            address,
            tid: trackId,
            txid: txID,
            state: 3,
            _user: user._id,
          });
          await transaction.save({ session });
          await creditUser(user, exchangedAmount, transaction._id, session);
        } else {
          console.log('\nPayment verification failed:', paymentStatus);
          throw new Error('Payment verification failed');
        }
      }

      await session.commitTransaction();
      
      // Log security audit
      console.log('\nSecurity Audit:', {
        processingTime: Date.now() - startTime,
        userIP: req.headers['cf-connecting-ip'] || req.ip,
        country: req.headers['cf-ipcountry'],
        transactionId: transaction?._id,
        userId: user._id,
        amount: exchangedAmount,
        currency: payCurrency
      });

      return res.sendStatus(200);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('\nCallback error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

async function creditUser(user, amount, transactionId, session) {
  console.log('\nCrediting user:', { 
    userId: user._id,
    amount,
    transactionId
  });
  
  try {
    // Create wallet transaction with session
    await insertNewWalletTransaction(
      user._id, 
      amount, 
      "Crypto deposit", 
      { transactionId },
      { session }
    );

    // Apply affiliate credit if applicable with session
    await checkAndApplyAffiliatorDeposit(
      user._id.toString(), 
      amount,
      { session }
    );

    // Update user's wallet
    const result = await User.updateOne(
      { _id: user._id },
      {
        $inc: {
          wallet: amount,
          totalDeposited: amount,
          wagerNeededForWithdraw:
            user.wagerNeededForWithdraw < 0
              ? Math.abs(user.wagerNeededForWithdraw) + amount
              : amount,
        },
      },
      { session }
    );

    console.log('\nUser update result:', result);
    
    if (result.n !== 1 || result.ok !== 1) {
      throw new Error('Failed to update user wallet');
    }
  } catch (error) {
    console.error('\nError crediting user:', error);
    throw error;
  }
}

/**
 * @route   POST /api/callback/check-all
 * @desc    Check and process all pending deposits
 * @access  Private (Admin only)
 */
router.post('/check-all', async (req, res) => {
  console.log('\n=== CHECKING ALL PENDING DEPOSITS ===');
  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  try {
    // Get all pending transactions from last 24 hours
    const pendingTxs = await CryptoTransaction.find({
      state: { $ne: 3 }, // Not completed
      created: { 
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
      }
    }).populate('_user', '_id wallet wagerNeededForWithdraw').lean();

    console.log(`\nFound ${pendingTxs.length} pending transactions`);

    for (const tx of pendingTxs) {
      try {
        console.log(`\nChecking transaction ${tx._id} (${tx.currency})`);
        
        if (!tx._user) {
          console.log('No user found for transaction');
          results.failed.push({
            id: tx._id,
            reason: 'No user found'
          });
          continue;
        }

        // Check status with OXAPay
        const status = await checkDepositStatus(tx.tid);
        console.log('OXAPay status:', status);

        if (!status) {
          results.failed.push({
            id: tx._id,
            reason: 'Could not get status from OXAPay'
          });
          continue;
        }

        if (status.status !== 'Paid') {
          results.skipped.push({
            id: tx._id,
            status: status.status
          });
          continue;
        }

        // Start session for atomic operations
        const session = await mongoose.startSession();
        await session.startTransaction();

        try {
          // Update transaction state
          await CryptoTransaction.updateOne(
            { _id: tx._id },
            { $set: { state: 3 } },
            { session }
          );

          // Credit user
          await creditUser(tx._user, tx.siteValue, tx._id, session);
          
          await session.commitTransaction();
          
          results.success.push({
            id: tx._id,
            amount: tx.siteValue,
            userId: tx._user._id
          });

          console.log(`Successfully processed transaction ${tx._id}`);
        } catch (error) {
          await session.abortTransaction();
          throw error;
        } finally {
          session.endSession();
        }
      } catch (error) {
        console.error(`Error processing transaction ${tx._id}:`, error);
        results.failed.push({
          id: tx._id,
          reason: error.message
        });
      }
    }

    // Generate summary
    const summary = {
      total: pendingTxs.length,
      processed: results.success.length,
      failed: results.failed.length,
      skipped: results.skipped.length,
      successAmount: results.success.reduce((sum, tx) => sum + tx.amount, 0)
    };

    console.log('\n=== PROCESSING COMPLETE ===');
    console.log('Summary:', summary);

    return res.json({
      message: 'Processing complete',
      summary,
      results
    });
  } catch (error) {
    console.error('Failed to process pending deposits:', error);
    return res.status(500).json({ 
      error: 'Failed to process pending deposits',
      details: error.message
    });
  }
});

module.exports = router;
