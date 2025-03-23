const socketio = require("socket.io");
const config = require("../config");
// const { verifyToken } = require("../utils/auth");
const { listen: listenToChat } = require("./chat");
const { listen: listenToCoinflip } = require("./games/coinflip");
const { listen: listenToJackpot } = require("./games/jackpot");
const { listen: listenToRoulette } = require("./games/roulette");
const { listen: listenToWheel } = require("./games/wheel");
const { listen: listenToCrash } = require("./games/crash");
const { listen: listenToBattles } = require("./games/battles");
const { listen: listenToKings } = require("./games/kings");

// Rate limiting and security maps
const connectionAttempts = new Map();
const blacklistedIPs = new Set();
const MAX_CONNECTIONS_PER_IP = 100; // Increased from 50
const CONNECTION_WINDOW_MS = 60000; // 1 minute
const MAX_MESSAGE_SIZE = 1e6; // 1MB

// Helper function to clean up old connection attempts
const cleanupOldAttempts = () => {
  const now = Date.now();
  for (const [ip, attempts] of connectionAttempts.entries()) {
    const recentAttempts = attempts.filter(time => now - time < CONNECTION_WINDOW_MS);
    if (recentAttempts.length === 0) {
      connectionAttempts.delete(ip);
    } else {
      connectionAttempts.set(ip, recentAttempts);
    }
  }
};

// Run cleanup every minute
setInterval(cleanupOldAttempts, 60000);

// Configure Socket.io
const startSocketServer = (server, app) => {
  try {
    // Main socket.io instance with secure CORS config
    const io = socketio(server, {
      path: '/socket.io',
      cors: {
        origin: process.env.NODE_ENV === "production"
          ? config.cors.production
          : config.cors.development,
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type']
      },
      // Enhanced security options
      allowRequest: (req, callback) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check if IP is blacklisted
        if (blacklistedIPs.has(ip)) {
          callback(null, false);
          return;
        }

        // Track connection attempts with more lenient limits for development
        if (!connectionAttempts.has(ip)) {
          connectionAttempts.set(ip, []);
        }
        const attempts = connectionAttempts.get(ip);
        const now = Date.now();
        attempts.push(now);

        // Clean up old attempts
        const recentAttempts = attempts.filter(time => now - time < CONNECTION_WINDOW_MS);
        connectionAttempts.set(ip, recentAttempts);

        // More lenient connection limit check
        if (recentAttempts.length > MAX_CONNECTIONS_PER_IP * 2) { // Doubled the limit
          console.warn(`High connection rate from IP: ${ip}`);
          // Don't blacklist immediately, just log warning
          if (recentAttempts.length > MAX_CONNECTIONS_PER_IP * 4) { // Only blacklist at 4x the limit
            blacklistedIPs.add(ip);
            callback(null, false);
            return;
          }
        }

        callback(null, true);
      },
      pingTimeout: 30000, // Increased timeouts
      pingInterval: 35000,
      upgradeTimeout: 20000,
      transports: ['websocket'],
      // Add socket.io specific settings
      connectTimeout: 45000,
      maxHttpBufferSize: 1e8, // Increased buffer size
      perMessageDeflate: {
        threshold: 2048 // Only compress messages larger than 2KB
      }
    });

    // Initialize game controllers BEFORE global middleware
    listenToChat(io);
    listenToCoinflip(io);
    listenToJackpot(io);
    listenToRoulette(io);
    listenToWheel(io);
    listenToCrash(io);
    listenToBattles(io);
    listenToKings(io);

    // Apply global middleware for all namespaces
    io.use(async (socket, next) => {
      try {
        // Validate message size
        socket.use((packet, nextMiddleware) => {
          if (JSON.stringify(packet).length > MAX_MESSAGE_SIZE) {
            socket.disconnect();
            return;
          }
          nextMiddleware();
        });

        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    // Attach io instance to app for use in other routes
    app.set('io', io);

    return io;
  } catch (error) {
    console.error('Error starting socket server:', error);
    throw error;
  }
};

module.exports = { startSocketServer };
