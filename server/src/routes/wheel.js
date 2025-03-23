// Require Dependencies
const express = require("express");
const router = (module.exports = express.Router());
const { getCurrentGame } = require("../controllers/games/wheel");

const WheelGame = require("../models/WheelGame");

/**
 * @route   GET /api/wheel/
 * @desc    Get wheel schema
 * @access  Public
 */
router.get("/", async (req, res, next) => {
  try {
    // Get active game
    const history = await WheelGame.find()
      .sort({ created: -1 })
      .select({
        privateSeed: 1,
        privateHash: 1,
        publicSeed: 1,
        randomModule: 1,
        winner: 1,
      })
      .limit(50);

    // Get current games
    const current = await getCurrentGame();

    return res.json({
      history,
      current,
    });
  } catch (error) {
    return next(error);
  }
});
