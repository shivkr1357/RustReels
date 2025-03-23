// Require Dependencies
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../../config");
const KingsGame = require("../../models/KingsGame");
const throttlerController = require("../throttler");
const User = require("../../models/User");

// Game Constants
const GAME_STATES = {
  WAITING: 'waiting',
  STARTING: 'starting',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  NotStarted: 'not_started'
};

// Initial game state
const INITIAL_GAME_STATE = {
  status: GAME_STATES.NotStarted,
  players: [],
  king: null,
  challenger: null,
  totalPot: 0,
  serverSeed: '',
  clientSeed: '',
  nonce: 0,
  kingBounty: 0,
  kingItems: [],
  challengerItems: [],
  playersInQueue: 0,
  provablyFair: true,
  roundNumber: 0,
  joinable: true,
  timeLeft: 30,
  winner: null
};

// Declare game state
let GAME_STATE = { ...INITIAL_GAME_STATE };

// Start new game function
const startNewGame = () => {
  GAME_STATE.joinable = true;
  GAME_STATE.timeLeft = 30;
  GAME_STATE.winner = null;
  GAME_STATE.king = null;
  GAME_STATE.challenger = null;
  GAME_STATE.status = GAME_STATES.NotStarted;
  GAME_STATE.kingBounty = 0;
  GAME_STATE.kingItems = [];
  GAME_STATE.challengerItems = [];
  GAME_STATE.playersInQueue = 0;
  GAME_STATE.roundNumber++;
};

// Socket connection handler
const listen = io => {
  console.log('[Kings] Initializing kings game namespace');
  
  // Initially start a new game
  startNewGame();

  // Listen for new websocket connections
  io.of("/kings").on("connection", async (socket) => {
    console.log('[Kings] New socket connection attempt');
    let loggedIn = false;
    let user = null;

    // Throttle connections
    const clientIp = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
    if (!throttlerController.checkConnection(clientIp)) {
      socket.emit("error", "Too many connection attempts. Try again later.");
      socket.disconnect();
      return;
    }

    // Send initial game state
    socket.emit("game-state", GAME_STATE);

    // Authenticate websocket connection
    socket.on("auth", async token => {
      if (!token) {
        loggedIn = false;
        user = null;
        return socket.emit(
          "error", 
          "No authentication token provided, authorization declined"
        );
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, config.authentication.jwtSecret);
        user = await User.findOne({ _id: decoded.user.id });
        
        if (user) {
          if (parseInt(user.banExpires) > new Date().getTime()) {
            loggedIn = false;
            user = null;
            socket.emit("user banned");
          } else {
            loggedIn = true;
            socket.emit("game-state", GAME_STATE);
          }
        } else {
          loggedIn = false;
          user = null;
          socket.emit("error", "User not found");
        }
      } catch (error) {
        console.error("[Kings] Auth error:", error);
        loggedIn = false;
        user = null;
        socket.emit("error", "Authentication failed");
      }
    });

    // Handle join game request
    socket.on("join-game", async position => {
      try {
        // Validate auth
        if (!loggedIn || !user) {
          socket.emit("error", "Not authenticated");
          return;
        }

        // Validate position
        if (position !== "king" && position !== "challenger") {
          socket.emit("error", "Invalid position");
          return;
        }

        // Create player data
        const playerData = {
          id: user._id,
          username: user.username,
          avatar: user.avatar || '/default-avatar.svg',
          position: position,
          items: []
        };

        // Update game state
        if (position === "king") {
          GAME_STATE.king = playerData;
        } else {
          GAME_STATE.challenger = playerData;
        }

        // Emit updated game state to all clients
        io.of("/kings").emit("game-state", GAME_STATE);
        console.log("[Kings] Player joined as", position);
      } catch (error) {
        console.error("[Kings] Join error:", error);
        socket.emit("error", "Failed to join game");
      }
    });
  });

  return io;
};

module.exports = { listen };
