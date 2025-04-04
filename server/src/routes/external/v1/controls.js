// Require Dependencies
const express = require("express");
const router = (module.exports = express.Router());
const { check, validationResult } = require("express-validator");
const {
  toggleMaintenance,
  getMaintenanceState,
  toggleLogin,
  getLoginState,
  toggleDeposits,
  getDepositState,
  toggleWithdraws,
  getWithdrawState,
  toggleCoinflip,
  getCoinflipState,
  toggleJackpot,
  getJackpotState,
  toggleRoulette,
  getRouletteState,
  toggleWheel,
  getWheelState,
  toggleCrash,
  getCrashState,
} = require("../../../controllers/site-settings");

/**
 * @route   GET /api/external/v1/controls/
 * @desc    Get toggle states
 * @access  Private
 */
router.get("/", async (req, res) => {
  return res.json({
    maintenanceEnabled: getMaintenanceState(),
    loginEnabled: getLoginState(),
    depositsEnabled: getDepositState(),
    withdrawsEnabled: getWithdrawState(),
    gamesEnabled: {
      coinflipEnabled: getCoinflipState(),
      jackpotEnabled: getJackpotState(),
      rouletteEnabled: getRouletteState(),
      wheelEnabled: getWheelState(),
      crashEnabled: getCrashState(),
    },
  });
});

/**
 * @route   POST /api/external/v1/controls/toggle-state
 * @desc    Toggle states on the site
 * @access  Private
 */
router.post(
  "/toggle-state",
  [
    check("name", "Toggle name is required")
      .isString()
      .isIn([
        "maintenance",
        "login",
        "deposit",
        "withdraw",
        "coinflip",
        "jackpot",
        "roulette",
        "wheel",
        "crash",
      ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      res.status(400);
      return res.json({ errors: errors.array() });
    }

    const { name } = req.body;

    // Switch from possible toggles
    switch (name) {
      case "maintenance":
      default:
        // Toggle maintenance status
        toggleMaintenance();

        return res.json({
          currentState: getMaintenanceState(),
        });
      case "login":
        // Toggle login status
        toggleLogin();

        return res.json({
          currentState: getLoginState(),
        });
      case "deposit":
        // Toggle deposit status
        toggleDeposits();

        return res.json({
          currentState: getDepositState(),
        });
      case "withdraw":
        // Toggle withdraw status
        toggleWithdraws();

        return res.json({
          currentState: getWithdrawState(),
        });
      case "coinflip":
        // Toggle coinflip status
        toggleCoinflip();

        return res.json({
          currentState: getCoinflipState(),
        });
      case "jackpot":
        // Toggle Jackpot status
        toggleJackpot();

        return res.json({
          currentState: getJackpotState(),
        });
      case "roulette":
        // Toggle maintenance status
        toggleRoulette();

        return res.json({
          currentState: getRouletteState(),
        });
      case "wheel":
        // Toggle maintenance status
        toggleWheel();

        return res.json({
          currentState: getWheelState(),
        })
      case "crash":
        // Toggle maintenance status
        toggleCrash();

        return res.json({
          currentState: getCrashState(),
        });
    }
  }
);
