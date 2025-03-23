// Require Dependencies
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const mongoose = require("mongoose");
const throttlerController = require("../throttler");
const config = require("../../config");
const colors = require("colors");
const {
  generatePrivateSeedHashPair,
  generateWheelRandom,
  generateWheelMysteryRandom,
  generateWheelFirstRandom,
} = require("../random");
const { checkAndEnterRace, checkAndApplyRakeToRace } = require("../race");
const { checkAndApplyRakeback } = require("../vip");
const { checkAndApplyAffiliatorCut } = require("../affiliates");
const { getWheelState } = require("../site-settings");
const insertNewWalletTransaction = require("../../utils/insertNewWalletTransaction");

const User = require("../../models/User");
const WheelGame = require("../../models/WheelGame");
const addWageredToRakeBack = require("../../utils/addWageredToRakeBack");

// Declare game state
const GAME_STATE = {
  joinable: false,
  timeLeft: 0,
  winner: null,
  winningMultiplier: null,
  players: [],
  privateSeed: null,
  privateHash: null,
  publicSeed: null,
  randomModule: 0,
  _id: null,
  intervalId: null,
};

// Declare client animation (spin) length
const CLIENT_ANIMATION_LENGTH = 12000; // 12 seconds to match frontend's slower spin
const SPECIAL_ANIMATION_LENGTH = 2000; // 2 seconds for special animations
const MYSTERY_ANIMATION_LENGTH = 2000; // 2 seconds for mystery animations

// Declare wheel order
const WHEEL_ORDER = [
  0, // mystery
  1, // gold
  3, // green
  1, // gold
  5, // blue
  1, // gold
  3, // green
  1, // gold
  10, // purple
  1, // gold
  3, // green
  1, // gold
  5, // blue
  1, // gold
  5, // blue
  3, // green
  1, // gold
  10, // purple
  1, // gold
  3, // green
  1, // gold
  5, // blue
  1, // gold
  3, // green
  1 // gold
];
// Export state to external controllers
const getCurrentGame = () => ({
  ...GAME_STATE,
  privateSeed: null,
  intervalId: null,
});

// Calculate winner from random data
const getWinningColor = async winningMultiplier => {
  return new Promise((resolve, reject) => {
    switch (winningMultiplier) {
      case 1:
        resolve("gold");
        break;
      case 3:
        resolve("green");
        break;
      case 5:
        resolve("blue");
        break;
      case 10:
        resolve("purple");
        break;
      case 0:
        resolve("red");
        break;
      default:
        reject(
          new Error(`Couldn't calculate winner: Invalid multiplier amount! Debug multiplier: ${winningMultiplier}`)
        );
    }
  });
};

// Calculate winner from random data
const getMysteryMultiplier = async randomModule => {
  return new Promise((resolve, reject) => {
    if (randomModule <= 55) {
      resolve(1);
    } else if (randomModule <= 75) {
      resolve(1);
    } else if (randomModule <= 87.5) {
      resolve(3);
    } else if (randomModule <= 95) {
      resolve(3);
    } else if (randomModule <= 98) {
      resolve(5);
    } else if (randomModule <= 100) {
      resolve(10);
    } else {
      reject(new Error("Couldn't calculate winner: Invalid module!"));
    }
  });
};

// Get socket.io instance
const listen = io => {
  // Add previous game to history (database)
  const addCurrentGameToHistory = async () => {
    const game = { ...GAME_STATE };

    // Delete not needed props
    delete game.joinable;
    delete game.timeLeft;
    delete game.intervalId;

    try {
      // Push game to db
      const newGame = new WheelGame(game);

      // Save the new document
      await newGame.save();

      // Add to local history
      io.of("/wheel").emit("add-game-to-history", {
        privateSeed: game.privateSeed,
        privateHash: game.privateHash,
        publicSeed: game.publicSeed,
        randomModule: game.randomModule,
        winner: game.winner,
        _id: newGame._id,
      });
    } catch (error) {
      console.log("Error while saving wheel game to the database:", error);
    }
  };

  // End current game
  const endCurrentWheelGame = async () => {
    // Don't allow more bets
    GAME_STATE.joinable = false;

    console.log(colors.yellow("Wheel >> Rolling current game"));

    try {
      // Generate random data
      const firstRandomData = await generateWheelFirstRandom();
      const randomData = await generateWheelRandom(
        GAME_STATE._id,
        GAME_STATE.privateSeed,
        firstRandomData.publicSeed,
        1
      );

      // Calculate winner
      const winningIndex = Math.floor(randomData.module * WHEEL_ORDER.length);
      const winningMultiplier = WHEEL_ORDER[winningIndex] || 1; // Default to 1x if something goes wrong
      const winningColor = await getWinningColor(winningMultiplier);

      // Update local object
      GAME_STATE.randomModule = randomData.module;
      GAME_STATE.publicSeed = firstRandomData.publicSeed;
      GAME_STATE.winner = winningColor;

      console.log(
        colors.yellow("Wheel >> Game"),
        GAME_STATE._id,
        colors.yellow("rolled, winning color:"),
        `${winningColor} (${winningMultiplier}x)`
      );

      // Emit to clients
      io.of("/wheel").emit("game-rolled", winningIndex, winningMultiplier);

      // Wait until client finishes animation
      const timeout = setTimeout(async () => {
        clearTimeout(timeout);

        // If it was a Mystery Cup, generate another round picking multiplier
        if (winningMultiplier === 0) {
          console.log(
            colors.yellow("Wheel >> Rolled special tile, rolling again...")
          );

          // Generate mystery multiplier
          const mysteryRandomData = await generateWheelMysteryRandom(
            GAME_STATE._id,
            GAME_STATE.privateSeed,
            GAME_STATE.publicSeed,
            2
          );

          // Calculate mystery multiplier (2-7x)
          const mysteryMultiplier = await getMysteryMultiplier(
            mysteryRandomData.module
          );

          io.of("/wheel").emit(
            "additional-multiplier-rolled",
            mysteryMultiplier
          );

          // Wait until client finishes mystery animation
          setTimeout(async () => {
            // Generate random data for reroll
            const secondRandomData = await generateWheelRandom(
              GAME_STATE._id,
              GAME_STATE.privateSeed,
              GAME_STATE.publicSeed,
              3
            );

            // Calculate next multiplier
            const secondWinningIndex = Math.floor(secondRandomData.module * WHEEL_ORDER.length);
            const secondMultiplier = WHEEL_ORDER[secondWinningIndex] !== 0 ? WHEEL_ORDER[secondWinningIndex] : 1;
            const secondWinningColor = await getWinningColor(secondMultiplier);

            // Emit to clients
            io.of("/wheel").emit(
              "special-game-rolled",
              secondWinningIndex
            );

            console.log(
              colors.yellow("Wheel >> Rolled"),
              secondMultiplier +
                "x (" +
                mysteryMultiplier +
                "x, " +
                mysteryRandomData.module +
                "%) =",
              secondMultiplier * mysteryMultiplier + "x",
              colors.yellow("on mystery cup!")
            );

            // Wait until client finishes animation
            const timeout = setTimeout(async () => {
              clearTimeout(timeout);

              io.of("/wheel").emit(
                "multiplier-rolled",
                mysteryMultiplier * secondMultiplier
              );

              // Find winners and payout
              for (let index = 0; index < GAME_STATE.players.length; index++) {
                const player = GAME_STATE.players[index];

                // If player won
                if (player.color === secondWinningColor) {
                  // Calculate profit
                  const profit =
                    player.betAmount * mysteryMultiplier * secondMultiplier;
                  const houseRake =
                    profit * config.games.wheel.feePercentage;
                  const wonAmount = player.betAmount + profit;

                  // Payout winner
                  await User.updateOne(
                    { _id: player._id },
                    {
                      $inc: {
                        wallet: Math.abs(wonAmount),
                      },
                    }
                  );
                  insertNewWalletTransaction(
                    player._id,
                    Math.abs(wonAmount),
                    "Wheel win",
                    { wheelGameId: GAME_STATE._id }
                  );

                  console.log(
                    colors.yellow("Wheel >> Paid"),
                    wonAmount.toFixed(2),
                    colors.yellow("to"),
                    player.username
                  );

                  // Update local wallet
                  io.of("/wheel")
                    .to(player._id)
                    .emit("update-wallet", Math.abs(wonAmount));

                  // Apply 0.5% rake to current race prize pool
                  await checkAndApplyRakeToRace(houseRake * 0.005);

                  // Apply user's rakeback if eligible
                  await checkAndApplyRakeback(player._id, houseRake);

                  // Apply cut of house edge to user's affiliator
                  await checkAndApplyAffiliatorCut(player._id, houseRake);
                }
              }

              // Update multiplier
              GAME_STATE.winningMultiplier =
                mysteryMultiplier * secondMultiplier;

              // Wait for tile animation
              setTimeout(() => {
                // Reset game
                addCurrentGameToHistory();
                startNewGame();
              }, SPECIAL_ANIMATION_LENGTH);
            }, CLIENT_ANIMATION_LENGTH);
          }, MYSTERY_ANIMATION_LENGTH);
        } else {
          // Play animation on client
          io.of("/wheel").emit("multiplier-rolled", winningMultiplier);

          // Find winners and payout
          for (let index = 0; index < GAME_STATE.players.length; index++) {
            const player = GAME_STATE.players[index];

            // If player won
            if (player.color === winningColor) {
              // Calculate profit
              const profit = player.betAmount * winningMultiplier;
              const houseRake = profit * config.games.wheel.feePercentage;
              const wonAmount = player.betAmount + profit;

              // Payout winner
              await User.updateOne(
                { _id: player._id },
                {
                  $inc: {
                    wallet: Math.abs(wonAmount),
                  },
                }
              );
              insertNewWalletTransaction(
                player._id,
                Math.abs(wonAmount),
                "Wheel win",
                { wheelGameId: GAME_STATE._id }
              );

              console.log(
                colors.yellow("Wheel >> Paid"),
                wonAmount.toFixed(2),
                colors.yellow("to"),
                player.username
              );

              // Update local wallet
              io.of("/wheel")
                .to(player._id)
                .emit("update-wallet", Math.abs(wonAmount));

              // Apply 0.5% rake to current race prize pool
              await checkAndApplyRakeToRace(houseRake * 0.005);

              // Apply user's rakeback if eligible
              await checkAndApplyRakeback(player._id, houseRake);

              // Apply cut of house edge to user's affiliator
              await checkAndApplyAffiliatorCut(player._id, houseRake);
            }
          }

          // Update multiplier
          GAME_STATE.winningMultiplier = winningMultiplier;

          // Wait for tile animation
          setTimeout(() => {
            // Reset game
            addCurrentGameToHistory();
            startNewGame();
          }, SPECIAL_ANIMATION_LENGTH);
        }
      }, CLIENT_ANIMATION_LENGTH);
    } catch (error) {
      console.log("Error while ending a wheel game:", error);

      // Notify clients that we had an error
      io.of("/wheel").emit(
        "notify-error",
        "Our server couldn't connect to EOS Blockchain, retrying in 15s"
      );

      // Timeout to retry
      const timeout = setTimeout(() => {
        // Retry ending the game
        endCurrentWheelGame();

        return clearTimeout(timeout);
      }, 15000);
    }
  };

  // Start a new game
  const startNewGame = async () => {
    // Generate pre-roll provably fair data
    const provablyData = await generatePrivateSeedHashPair();

    // Reset state
    GAME_STATE.joinable = true;
    GAME_STATE.timeLeft = config.games.wheel.waitingTime;
    GAME_STATE.winner = null;
    GAME_STATE.winningMultiplier = null;
    GAME_STATE.players = [];
    GAME_STATE.privateSeed = provablyData.seed;
    GAME_STATE.privateHash = provablyData.hash;
    GAME_STATE.publicSeed = null;
    GAME_STATE.randomModule = 0;
    GAME_STATE._id = mongoose.Types.ObjectId();

    // Clear game main interval
    clearInterval(GAME_STATE.intervalId);

    console.log(
      colors.yellow("Wheel >> Generated new game with the id"),
      GAME_STATE._id
    );

    // Emit to clients
    io.of("/wheel").emit(
      "new-round",
      config.games.wheel.waitingTime,
      GAME_STATE._id,
      GAME_STATE.privateHash
    );

    // Start a new game interval
    GAME_STATE.intervalId = setInterval(() => {
      // Decrement time left
      GAME_STATE.timeLeft -= 10;

      // Check if timer has reached 0
      if (GAME_STATE.timeLeft <= 0) {
        endCurrentWheelGame();
        return clearInterval(GAME_STATE.intervalId);
      }
    }, 10);
  };

  // Initially start a new game
  startNewGame();

  // Listen for new websocket connections
  io.of("/wheel").on("connection", socket => {
    let loggedIn = false;
    let user = null;

    // Throttle connnections
    socket.use(throttlerController(socket));

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
            // console.log("banned");
            loggedIn = false;
            user = null;
            return socket.emit("user banned");
          } else {
            loggedIn = true;
            socket.join(String(user._id));
            // socket.emit("notify-success", "Successfully authenticated!");
          }
        }
        // return socket.emit("alert success", "Socket Authenticated!");
      } catch (error) {
        loggedIn = false;
        user = null;
        return socket.emit("notify-error", "Authentication token is not valid");
      }
    });

    // Check for users ban status
    socket.use(async (packet, next) => {
      if (loggedIn && user) {
        try {
          const dbUser = await User.findOne({ _id: user.id });

          // Check if user is banned
          if (dbUser && parseInt(dbUser.banExpires) > new Date().getTime()) {
            return socket.emit("user banned");
          } else {
            return next();
          }
        } catch (error) {
          return socket.emit("user banned");
        }
      } else {
        return next();
      }
    });

    /**
     * @description Join a current game
     *
     * @param {string} color What color to bet on
     * @param {number} betAmount Bet amount
     */
    socket.on("join-game", async (color, betAmount) => {
      // Validate user input
      if (
        typeof color !== "string" ||
        !["gold", "green", "blue", "purple", "red"].includes(color)
      )
        return socket.emit("game-join-error", "Invalid Color Type!");
      if (typeof betAmount !== "number" || isNaN(betAmount))
        return socket.emit("game-join-error", "Invalid Bet Amount Type!");
      if (!loggedIn)
        return socket.emit("game-join-error", "You are not logged in!");

      // Get wheel enabled status
      const isEnabled = getWheelState();

      // If wheel is disabled
      if (!isEnabled) {
        return socket.emit(
          "game-join-error",
          "Wheel gamemode is currently disabled! Contact admins for more information."
        );
      }

      // More validation on the bet value
      const { minBetAmount, maxBetAmount } = config.games.wheel;
      if (
        parseFloat(betAmount.toFixed(2)) < minBetAmount ||
        parseFloat(betAmount.toFixed(2)) > maxBetAmount
      ) {
        return socket.emit(
          "game-join-error",
          `Your bet must be a minimum of ${minBetAmount} credits and a maximum of ${maxBetAmount} credits!`
        );
      }

      // Check if current game is joinable
      if (!GAME_STATE.joinable)
        return socket.emit("game-join-error", "Cannot join this game!");

      try {
        // Get user from database
        const dbUser = await User.findOne({ _id: user.id });

        // If user has restricted bets
        if (dbUser.betsLocked) {
          return socket.emit(
            "game-join-error",
            "Your account has an betting restriction. Please contact support for more information."
          );
        }

        // If user can afford this bet
        if (dbUser.wallet < parseFloat(betAmount.toFixed(2))) {
          return socket.emit("game-join-error", "You can't afford this bet!");
        }

        // Remove bet amount from user's balance
        await User.updateOne(
          { _id: user.id },
          {
            $inc: {
              wallet: -Math.abs(parseFloat(betAmount.toFixed(2))),
              wager: Math.abs(parseFloat(betAmount.toFixed(2))),
              wagerNeededForWithdraw: -Math.abs(
                parseFloat(betAmount.toFixed(2))
              ),
            },
          }
        );
        insertNewWalletTransaction(
          user.id,
          -Math.abs(parseFloat(betAmount.toFixed(2))),
          "Wheel play",
          { wheelGameId: GAME_STATE._id }
        );

        // add wagered to rakeback
        addWageredToRakeBack(user.id, Math.abs(parseFloat(betAmount.toFixed(2))))

        // Update local wallet
        socket.emit(
          "update-wallet",
          -Math.abs(parseFloat(betAmount.toFixed(2)))
        );

        // Update user's race progress if there is an active race
        await checkAndEnterRace(
          user.id,
          Math.abs(parseFloat(betAmount.toFixed(2)))
        );

        // Contruct a new player object
        const player = {
          _id: user.id,
          username: user.username,
          avatar: user.avatar,
          color,
          betAmount: parseFloat(betAmount.toFixed(2)), // Convert two-decimal into float
          betId: uuid.v4(),
        };

        // Add player to state
        GAME_STATE.players.push(player);

        // Notify clients
        io.of("/wheel").emit("new-player", player);
        return socket.emit("game-join-success");
      } catch (error) {
        console.log("Error while placing a wheel bet:", error);
        return socket.emit(
          "game-join-error",
          "Your bet couldn't be placed: Internal server error, please try again later!"
        );
      }
    });
  });
};

// Export functions
module.exports = { listen, getCurrentGame };
