// Require Dependencies
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

// Setup clashpotGame Schema
const sbWithdrawTransactionSchema = new mongoose.Schema({
  // Basic fields
  user_id: String,
  buy_id: String,
  offer_status: String,
  amount: {
    type: Number,
    default: 0,
  },

  item: {
    type: String,
    default: '',
  },
  balance_debited_sum: {
    type: Number,
    default: 0,
  },
  state: {
    type: Number,
    default: 0,
  },

  unixtime: {
    type: Number,
    default: Date.now(),
  },

  // When transaction was created
  created: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the new model
const sbWithdrawTransaction = (module.exports = mongoose.model(
  "sbWithdrawTransaction",
  sbWithdrawTransactionSchema
));