// Require Dependencies
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

// Setup Raffle Schema
const RaffleSchema = new mongoose.Schema({
  // Basic fields
  prize: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  endingDate: {
    type: Number,
    required: true
  },

  // Raffle winner
  winner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    default: null
  },

  // When raffle was created
  createdAt: {
    type: Number,
    default: () => Date.now()
  }
});

// Create the model
const Raffle = mongoose.model("Raffle", RaffleSchema);

// Export the model
module.exports = Raffle;
