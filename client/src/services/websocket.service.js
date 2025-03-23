import io from "socket.io-client";
import { API_URL } from "./api.service";

// Get base socket URL for the current environment
const SOCKET_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000"
  : "https://api.silorust.com";

// Socket.io options with proper configuration
const socketOptions = {
  autoConnect: false,
  transports: ['websocket'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  path: '/socket.io'
};

// Create socket connections
console.log('[WS] Creating socket connections to:', SOCKET_URL);

// Export individual socket connections with proper namespace handling
export const chatSocket = io(`${SOCKET_URL}/chat`, socketOptions);
export const coinflipSocket = io(`${SOCKET_URL}/coinflip`, socketOptions);
export const jackpotSocket = io(`${SOCKET_URL}/jackpot`, socketOptions);
export const rouletteSocket = io(`${SOCKET_URL}/roulette`, socketOptions);
export const wheelSocket = io(`${SOCKET_URL}/wheel`, socketOptions);
export const crashSocket = io(`${SOCKET_URL}/crash`, socketOptions);
export const battlesSocket = io(`${SOCKET_URL}/battles`, socketOptions);
export const kingsSocket = io(`${SOCKET_URL}/kings`, socketOptions);

// Debug logging for kings socket
kingsSocket.on('connect', () => {
  console.log('[WS] Kings socket connected successfully');
});

kingsSocket.on('connect_error', (error) => {
  console.error('[WS] Socket error for /kings:', error);
});

// Export all socket connections
export const sockets = [
  chatSocket,
  coinflipSocket,
  jackpotSocket,
  rouletteSocket,
  wheelSocket,
  crashSocket,
  battlesSocket,
  kingsSocket
];  

// Get socket by namespace
export const getSocket = namespace => {
  switch (namespace) {
    case '/kings':
      return kingsSocket;
    case '/battles':
      return battlesSocket;
    case '/crash':
      return crashSocket;
    case '/wheel':
      return wheelSocket;
    case '/roulette':
      return rouletteSocket;
    case '/jackpot':
      return jackpotSocket;
    case '/coinflip':
      return coinflipSocket;
    case '/chat':
      return chatSocket;
    default:
      console.error('[WS] Socket error for ' + namespace + ':', 'Invalid namespace');
      return null;
  }
};

// Authenticate websocket connections
export const authenticateSockets = token => {
  if (!token) {
    console.error('[WS] No token provided for authentication');
    return;
  }

  try {
    // Disconnect all sockets first
    sockets.forEach(socket => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    });

    // Then connect with authentication
    sockets.forEach(socket => {
      if (!socket) return;

      // Set auth token
      socket.auth = { token };
      
      // Setup connection handlers
      socket.on('connect', () => {
        console.log(`[WS] Connected to ${socket.nsp}`);
        if (socket.connected) {
          socket.emit('auth', token);
        }
      });

      socket.on('connect_error', (error) => {
        console.error(`[WS] Connection error for ${socket.nsp}:`, error.message);
      });

      socket.on('error', (error) => {
        console.error(`[WS] Socket error for ${socket.nsp}:`, error);
      });

      socket.on('disconnect', (reason) => {
        console.log(`[WS] Disconnected from ${socket.nsp}:`, reason);
        if (reason === 'io server disconnect') {
          setTimeout(() => {
            if (!socket.connected) {
              socket.connect();
            }
          }, 1000);
        }
      });

      // Connect socket
      try {
        if (!socket.connected) {
          socket.connect();
        }
      } catch (error) {
        console.error(`[WS] Failed to connect to ${socket.nsp}:`, error);
      }
    });
  } catch (error) {
    console.error('[WS] Authentication error:', error);
  }
};