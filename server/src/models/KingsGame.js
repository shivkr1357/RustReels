const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/default-avatar.svg'
  },
  betAmount: {
    type: Number,
    required: true,
    min: 1
  },
  health: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  isReady: {
    type: Boolean,
    default: false
  }
});

const kingsGameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  players: [playerSchema],
  status: {
    type: String,
    enum: ['waiting', 'starting', 'in_progress', 'completed'],
    default: 'waiting'
  },
  currentRound: {
    type: Number,
    default: 0
  },
  lastAttacker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPot: {
    type: Number,
    default: 0
  },
  serverSeed: {
    type: String,
    required: true
  },
  clientSeed: {
    type: String,
    required: true
  },
  nonce: {
    type: Number,
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
kingsGameSchema.index({ gameId: 1 }, { unique: true });
kingsGameSchema.index({ status: 1 });
kingsGameSchema.index({ 'players.userId': 1 });
kingsGameSchema.index({ createdAt: -1 });

module.exports = mongoose.model('KingsGame', kingsGameSchema);
