// Require Dependencies
const config = require("../config");

// Store site toggle switch states here
// and initialize them to config values
let MAINTENANCE_ENABLED = config.site.enableMaintenanceOnStart;
let LOGIN_ENABLED = config.site.enableLoginOnStart;
let DEPOSITS_ENABLED = true;
let WITHDRAWS_ENABLED = true;
let COINFLIP_ENABLED = true;
let JACKPOT_ENABLED = true;
let ROULETTE_ENABLED = true;
let WHEEL_ENABLED = true;
let CRASH_ENABLED = true;
let BATTLES_ENABLED = true;
let KINGS_ENABLED = true;

// Rain settings
let AUTO_RAIN_ENABLED = true;
let AUTO_RAIN_INTERVAL = 60; // minutes
let AUTO_RAIN_AMOUNT = 0.50;

// Create getters
const getMaintenanceState = () => MAINTENANCE_ENABLED;
const getLoginState = () => LOGIN_ENABLED;
const getDepositState = () => DEPOSITS_ENABLED;
const getWithdrawState = () => WITHDRAWS_ENABLED;
const getCoinflipState = () => COINFLIP_ENABLED;
const getJackpotState = () => JACKPOT_ENABLED;
const getRouletteState = () => ROULETTE_ENABLED;
const getWheelState = () => WHEEL_ENABLED;
const getCrashState = () => CRASH_ENABLED;
const getBattlesState = () => BATTLES_ENABLED;
const getKingsState = () => KINGS_ENABLED;

// Rain getters
const getAutoRainState = () => AUTO_RAIN_ENABLED;
const getAutoRainInterval = () => AUTO_RAIN_INTERVAL;
const getAutoRainAmount = () => AUTO_RAIN_AMOUNT;

// Create reducers
const toggleMaintenance = () => {
  MAINTENANCE_ENABLED = !MAINTENANCE_ENABLED;
  return true;
};
const toggleLogin = () => {
  LOGIN_ENABLED = !LOGIN_ENABLED;
  return true;
};
const toggleDeposits = () => {
  DEPOSITS_ENABLED = !DEPOSITS_ENABLED;
  return true;
};
const toggleWithdraws = () => {
  WITHDRAWS_ENABLED = !WITHDRAWS_ENABLED;
  return true;
};
const toggleCoinflip = () => {
  COINFLIP_ENABLED = !COINFLIP_ENABLED;
  return true;
};
const toggleJackpot = () => {
  JACKPOT_ENABLED = !JACKPOT_ENABLED;
  return true;
};
const toggleRoulette = () => {
  ROULETTE_ENABLED = !ROULETTE_ENABLED;
  return true;
};
const toggleWheel = () => {
  WHEEL_ENABLED = !WHEEL_ENABLED;
  return true;
};
const toggleCrash = () => {
  CRASH_ENABLED = !CRASH_ENABLED;
  return true;
};
const toggleBattles = () => {
  BATTLES_ENABLED = !BATTLES_ENABLED;
  return true;
};
const toggleKings = () => {
  KINGS_ENABLED = !KINGS_ENABLED;
  return true;
};

// Rain setters
const toggleAutoRain = () => {
  AUTO_RAIN_ENABLED = !AUTO_RAIN_ENABLED;
  return true;
};

const setAutoRainInterval = minutes => {
  if (typeof minutes !== "number") return false;
  if (minutes < 1) return false;
  AUTO_RAIN_INTERVAL = minutes;
  return true;
};

const setAutoRainAmount = amount => {
  if (typeof amount !== "number") return false;
  if (amount < 0.01) return false;
  AUTO_RAIN_AMOUNT = amount;
  return true;
};

// Combine transaction getters and reducers
const transactionState = {
  getDepositState,
  toggleDeposits,
  getWithdrawState,
  toggleWithdraws,
};

// Combine game getters and reducers
const gameState = {
  getCoinflipState,
  toggleCoinflip,
  getJackpotState,
  toggleJackpot,
  getRouletteState,
  toggleRoulette,
  getWheelState,
  toggleWheel,
  getCrashState,
  toggleCrash,
  getBattlesState,
  toggleBattles,
  getKingsState,
  toggleKings,
};

// Combine rain getters and reducers
const rainState = {
  getAutoRainState,
  toggleAutoRain,
  getAutoRainInterval,
  setAutoRainInterval,
  getAutoRainAmount,
  setAutoRainAmount,
};

// Export all functions
module.exports = {
  getMaintenanceState,
  toggleMaintenance,
  getLoginState,
  toggleLogin,
  ...transactionState,
  ...gameState,
  ...rainState,
};
