const express = require("express");
const router = express.Router();
const { validateJWT } = require("../middleware/auth");
const KingsGame = require("../models/KingsGame");

/**
 * @route   GET /api/kings/
 * @desc    Get kings game state and history
 * @access  Public
 */
router.get("/", async (req, res, next) => {
  try {
    // Get active game
    const history = await KingsGame.find()
      .sort({ createdAt: -1 })
      .select({
        privateSeed: 1,
        privateHash: 1,
        publicSeed: 1,
        winner: 1,
        players: 1
      })
      .limit(50);

    // Get current game
    const current = await KingsGame.findOne({ status: 'active' })
      .sort({ createdAt: -1 });

    return res.json({
      history,
      current
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * @route   GET /api/kings/history
 * @desc    Get user's kings game history
 * @access  Private
 */
router.get("/history", validateJWT, async (req, res, next) => {
  try {
    const history = await KingsGame.find({ 
      'players.userId': req.user.id 
    })
    .sort({ createdAt: -1 })
    .limit(10);
    
    return res.json({
      success: true,
      history
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;