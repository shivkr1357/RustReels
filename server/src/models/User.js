// Require Dependencies
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

// Setup User Schema
const UserSchema = new mongoose.Schema({
  // Authentication related fields
  provider: String,
  providerId: String,
  username: String,
  password: String,
  avatar: String,

  // User's on-site rank
  rank: {
    type: Number,
    default: 1,
    /**
     * Ranks:
     *
     * 1 = User
     * 2 = Sponsor
     * 3 = Developer
     * 4 = Moderator
     * 5 = Admin
     */
  },

  // Site balance
  wallet: {
    type: Number,
    default: 0,      // default or minimum so it cant get lower then 0 for exploits
  },

  // Wager amount
  wager: {
    type: Number,
    default: 0,
  },

  // Holds user's crypto address information (addresses)
  crypto: Object,

  // Holds user's rakeback information
  rakeBack: Object,

  // Whether the user has verified their account (via mobile phone or csgo loyalty badge) normal it is false
  hasVerifiedAccount: {
    type: Boolean,
    default: true,
  },

  // Store their phone number to prevent multi-account verifications
  verifiedPhoneNumber: {
    type: String,
    default: null,
  },

  // When the account was verified
  accountVerified: {
    type: Date,
    default: null,
  },

  // Unix ms timestamp when the ban will end, 0 = no ban
  banExpires: {
    type: String,
    default: "0",
  },

  // Unix ms timestamps when the self-exclude will end, 0 = no ban
  selfExcludes: {
    crash: {
      type: Number,
      default: 0,
    },
    jackpot: {
      type: Number,
      default: 0,
    },
    coinflip: {
      type: Number,
      default: 0,
    },
    roulette: {
      type: Number,
      default: 0,
    },
    wheel: {
      type: Number,
      default: 0
    }
  },

  // Unix ms timestamp when the mute will end, 0 = no mute
  muteExpires: {
    type: String,
    default: "0",
  },

  // If user has restricted transactions
  transactionsLocked: {
    type: Boolean,
    default: false,
  },

  // If user has restricted bets
  betsLocked: {
    type: Boolean,
    default: false,
  },

  // UserID of the user who affiliated
  _affiliatedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    default: null,
  },

  // When the affiliate was redeemed
  affiliateClaimed: {
    type: Date,
    default: null,
  },

  // Unique affiliate code
  affiliateCode: {
    type: String,
    default: null,
    // unique: true, // doesn't work with multiple "null" values :(
  },

  // User affiliation bonus amount
  affiliateMoney: {
    type: Number,
    default: 0,
  },

  // How much affiliation bonus has been claimed (withdrawn)
  affiliateMoneyCollected: {
    type: Number,
    default: 0,
  },

  // Forgot Password
  forgotToken: {
    type: String,
    default: null,
  },

  forgotExpires: {
    type: Number,
    default: 0,
  },

  // How much rakeback has been collected
  rakebackBalance: {
    type: Number,
    default: 0,
  },

  // Keep track of 50% deposit amount
  // required by mitch :/
  wagerNeededForWithdraw: {
    type: Number,
    default: 0,
  },

  // Total amount of deposits
  totalDeposited: {
    type: Number,
    default: 0,
  },

  // Total amount of withdraws
  totalWithdrawn: {
    type: Number,
    default: 0,
  },

  // User custom wager limit (for sponsors)
  customWagerLimit: {
    type: Number,
    default: 0,
  },

  // User avatar last update
  avatarLastUpdate: {
    type: Number,
    default: 0
  },

  // When user was created (registered)
  created: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the new model
const User = (module.exports = mongoose.model("User", UserSchema));
