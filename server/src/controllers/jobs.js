// Require Dependencies
const config = require("../config");
const colors = require("colors/safe");
const insertNewWalletTransaction = require("../utils/insertNewWalletTransaction");
const Agenda = require("agenda");
const schedule = require('node-schedule');
const { chat, createAutomatedRain } = require('./chat');
const { 
  getAutoRainState, 
  getAutoRainInterval, 
  getAutoRainAmount 
} = require('./site-settings');

const User = require("../models/User");
const Race = require("../models/Race");
const RaceEntry = require("../models/RaceEntry");

// Setup Additional Variables
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? config.database.productionMongoURI
    : config.database.developmentMongoURI;

// Setup Agenda instance
const agenda = new Agenda({
  db: { address: MONGO_URI, options: { useUnifiedTopology: true } },
});

// IIFE to give access to async/await
(async () => {
  // Startup agenda
  await agenda.start();
})();

// Define agenda Jobs
agenda.define("endActiveRace", { priority: "high" }, async (job) => {
  const { _id } = job.attrs.data;

  // Find race from db
  const race = await Race.findOne({ _id });
  const participants = await RaceEntry.find({ _race: _id }).lean();

  // If race is still active
  if (race.active) {
    // Variable to hold winner data
    const winners = [];

    // Payout winners
    for (let index = 0; index < participants.length; index++) {
      const userId = participants.sort((a, b) => b.value - a.value)[index]._user;

      // If user is in the winning place
      if (index <= config.games.race.prizeDistribution.length - 1) {
        const payout =
          race.prize * (config.games.race.prizeDistribution[index] / 100);

        // Add to array
        winners.push(userId);

        // Update user //updateOne <- so it works
        await User.updateOne(
          { _id: userId },
          { $inc: { wallet: Math.abs(payout) }, }
        );
        insertNewWalletTransaction(
          userId,
          Math.abs(payout),
          `Race win #${index + 1}`,
          { raceId: race.id }
        );
      }
    }

    // Update race document
    await Race.updateOne(
      { _id },
      {
        $set: {
          active: false,
          winners,
        },
      }
    );

    //io.of("/chat").emit("race-state-changed", race.id); //import of io doesnt work..

    console.log(colors.green("Race >> Automatically ended race"), race.id);
  }
});

// Automatic rain job
// Default schedule: every hour
let rainJob;

// Schedule automated rain job
const scheduleRainJob = () => {
  try {
    const rainSettings = require('./site-settings');
    
    // Cancel existing job if any
    if (rainJob) {
      rainJob.cancel();
    }
    
    if (rainSettings.getAutoRainState()) {
      const interval = rainSettings.getAutoRainInterval();
      const amount = rainSettings.getAutoRainAmount();
      
      // Validate settings
      if (!Number.isFinite(interval) || interval < 1 || interval > 1440) {
        throw new Error('Invalid rain interval');
      }
      if (!Number.isFinite(amount) || amount <= 0 || amount > 1000) {
        throw new Error('Invalid rain amount');
      }
      
      // Schedule the rain job
      rainJob = schedule.scheduleJob(`*/${interval} * * * *`, async () => {
        try {
          const { createAutomatedRain } = require('./chat');
          await createAutomatedRain(amount);
          console.log(`[Jobs] Successfully created automated rain of $${amount}`);
        } catch (error) {
          console.error('[Jobs] Failed to create automated rain:', error);
        }
      });
      
      console.log(`[Jobs] Scheduled automated rain every ${interval} minutes with amount ${amount}`);
    } else {
      console.log('[Jobs] Automated rain is disabled');
    }
  } catch (error) {
    console.error('[Jobs] Error scheduling rain job:', error);
  }
};

// Initial schedule
scheduleRainJob();

// Re-schedule when settings change
const rainSettingsChanged = () => {
  scheduleRainJob();
};

// Export agenda instance
module.exports = { agenda };
