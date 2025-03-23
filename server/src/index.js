/**
 * clashpotcom Backend REST API main entry file
 *
 * Author: MaveGuy
 */

// Require Dependencies
const app = require("./controllers/express-app");
const colors = require("colors/safe");
const { Server } = require("http");
const { connectDatabase } = require("./utils");
const { startSocketServer } = require("./controllers/websockets");
const OxaPay = require('./controllers/oxapay')
const dotenv = require('dotenv')

dotenv.config()

// Declare useful variables
process.title = "clashpotcom-api";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 4000;

// Connect Database
connectDatabase();

// Create HTTP server
const server = Server(app);

// Start WebSocket server
startSocketServer(server, app);

// Setup HTTP server and start listening on given port
server.listen(PORT, () =>
  console.log(
    colors.green(
      `Server >> Listening on port ${PORT} (Production: ${IS_PRODUCTION})`
    )
  )
);

// Start the oxapay main functions
OxaPay.init()

// Export HTTP server
module.exports = { server };
