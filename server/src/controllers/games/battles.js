// Require Dependencies
const jwt = require("jsonwebtoken");
const { parallelLimit } = require("async");
const _ = require("lodash");
const throttlerController = require("../throttler");
const config = require("../../config");
const colors = require("colors");
const {
  generatePrivateSeedHashPair, generateBattlesRandom, 
} = require("../random");
const { checkAndEnterRace, checkAndApplyRakeToRace } = require("../race");
const { checkAndApplyRakeback, getVipLevelFromWager } = require("../vip");
const { checkAndApplyAffiliatorCut } = require("../affiliates");
const { getBattlesState } = require("../site-settings");
const insertNewWalletTransaction = require("../../utils/insertNewWalletTransaction");
const fs = require('fs');

const User = require("../../models/User");
const BattlesGame = require("../../models/BattlesGame");
const seedrandom = require("seedrandom");
const CaseSchema = require('../../models/Case');
const addWageredToRakeBack = require("../../utils/addWageredToRakeBack");

// Cache system for improved performance
const caseList = new Map();
const caseCache = new Map();
const seedRandomCache = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Optimized case lookup with caching
function getCaseWithCache(slug) {
  const now = Date.now();
  if (caseCache.has(slug)) {
    const cached = caseCache.get(slug);
    if (now - cached.timestamp < CACHE_TIMEOUT) {
      return cached.data;
    }
    caseCache.delete(slug);
  }
  const caseInfo = caseList.get(slug);
  if (caseInfo) {
    caseCache.set(slug, { data: caseInfo, timestamp: now });
  }
  return caseInfo;
}

// Optimized random number generation with caching
function getCachedRandom(seed) {
  if (!seedRandomCache.has(seed)) {
    seedRandomCache.set(seed, seedrandom(seed));
  }
  return seedRandomCache.get(seed);
}

// Cache cleanup interval
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of caseCache.entries()) {
    if (now - value.timestamp > CACHE_TIMEOUT) {
      caseCache.delete(key);
    }
  }
  // Limit seedRandomCache size
  if (seedRandomCache.size > 1000) {
    seedRandomCache.clear();
  }
}, CACHE_TIMEOUT);

let PENDING_GAMES = [];

async function loadCases() {
  let dbCases = await CaseSchema.find().lean()

  for (let c of dbCases) {
    caseList.set(c.slug, c)
  }
}
loadCases()

const getCases = () => [...caseList.values()].sort((a,b) => b.price - a.price)

// Get socket.io instance
const listen = async (io) => {

  function isPlayerAlreadyJoined(playersArray, playerId) {
    return playersArray.some(player => player && String(player.id) === String(playerId));
  }

  // Identify premium items (top 10%) for loot spins
  function identifyPremiumItems(caseInfo) {
    const sortedItems = [...caseInfo.items].sort((a, b) => b.price - a.price);
    const premiumCount = Math.ceil(sortedItems.length * 0.1); // Top 10%
    const premiumItems = sortedItems.slice(0, premiumCount);
    const premiumThreshold = premiumItems[premiumItems.length - 1].price;
    return {
      premiumItems,
      premiumThreshold,
      isPremiumItem: (item) => item.price >= premiumThreshold
    };
  }

  const generateCaseResult = async (caseObj, hash, playerCount, roundNum, players) => {
    const caseInfo = getCaseWithCache(caseObj.slug);
    if (!caseInfo) {
      throw new Error(`Case information not found for slug: ${caseObj.slug}`);
    }

    const { isPremiumItem } = identifyPremiumItems(caseInfo);

    // Use Promise.all for parallel processing of player results
    const result = await Promise.all(Array.from({ length: playerCount }, async (_, i) => {
      const playerIndex = i + 1;
      const seed = `${hash}:${playerIndex}:${roundNum}`;
      const rng = getCachedRandom(seed);
      const ticket = ~~(rng() * 100000);

      // Additional RNG for bait system
      const baitRng = getCachedRandom(seed + ':bait');
      const shouldBait = baitRng() < 0.35; // 35% chance to show bait items

      const item = caseInfo.items.find(
        (item) => ticket >= item.ticketsStart && ticket <= item.ticketsEnd
      );

      if (!item) {
        throw new Error(`No item found for ticket ${ticket} in case ${caseObj.slug}`);
      }

      // Check if this is a premium item for loot spin
      const isLootSpin = isPremiumItem(item);

      // Find items with higher value for baiting
      let baitItems = [];
      if (shouldBait) {
        baitItems = caseInfo.items
          .filter(i => i.price > item.price * 1.5) // Only items worth 1.5x more
          .sort(() => baitRng() - 0.5) // Shuffle
          .slice(0, 2); // Take up to 2 bait items
      }

      return {
        item: {
          name: item.name || '',
          color: item.color,
          type: item.type,
          chance: item.chance,
          stattrack: item.stattrack,
          image: item.image,
          price: item.price,
          ticketsStart: item.ticketsStart,
          ticketsEnd: item.ticketsEnd,
        },
        result: ticket,
        battlePlayerId: 0,
        team: playerIndex,
        userId: players[i].id,
        seed: seed,
        baitItems: baitItems.map(bItem => ({
          name: bItem.name || '',
          color: bItem.color,
          type: bItem.type,
          chance: bItem.chance,
          stattrack: bItem.stattrack,
          image: bItem.image,
          price: bItem.price,
        })),
        isLootSpin // Add flag for loot spin
      };
    }));

    return result;
  };

  function getRandomWeightedItems(data, totalItems) {
    const itemList = data.items;
    let weightedList = [];

    for (const item of itemList) {
      const weight = item.ticketsEnd - item.ticketsStart + 1;
      for (let i = 0; i < weight; i++) {
        weightedList.push(item);
      }
    }

    for (let i = weightedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [weightedList[i], weightedList[j]] = [weightedList[j], weightedList[i]];
    }

    return weightedList.slice(0, totalItems);
  }
  

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const runGame = async (battleId) => {
    const pendingGameIndex = PENDING_GAMES.findIndex(game => String(game._id) === String(battleId));
    if (pendingGameIndex === -1) {
      return console.error("Battle not found in PENDING_GAMES.");
    }
    let battle = PENDING_GAMES[pendingGameIndex];

    // Update battle in PENDING_GAMES instead of removing it
    let provablyData = await generatePrivateSeedHashPair();
    
    // Generate random data
    const randomData = await generateBattlesRandom(
      battle._id,
      provablyData.seed
    );

    console.log(
      colors.red("Battles >> Starting game"),
      battle._id,
      colors.red("with hash"),
      provablyData.hash
    );

    battle.status = 2;
    battle.privateHash = provablyData.hash;
    battle.publicSeed = randomData.publicSeed;

    // Update the battle in PENDING_GAMES
    PENDING_GAMES[pendingGameIndex] = battle;

    // Push the updated battle to the database
    await BattlesGame.updateOne({ _id: battle.id }, {
      $set: {
        status: battle.status,
        privateHash: battle.privateHash,
        publicSeed: battle.publicSeed,
      },
    });
  
    io.of("/battles").to("battles").emit("battles:start", {
      battleId: battleId,
      hash: battle.privateHash,
      publicSeed: battle.publicSeed,
    });
  
    await delay(3000);
  
    let resArr = [];
    for (let i = 0; i < battle.cases.length; i++) {
      const caseResult = await generateCaseResult(
        battle.cases[i],
        randomData.hash,
        battle.playerCount,
        i + 1,
        battle.players
      );
  
      const roundResults = [];
      for (let j = 0; j < battle.players.length; j++) {
        const item = caseResult[j];
        if (!item || !item.item) {
          roundResults.push(null);
          continue;
        }
        
        roundResults.push({
          item: item.item,
          team: j < 2 ? 1 : 2
        });
      }

      io.of("/battles").to(battle._id.toString()).emit("spin-result", {
        result: roundResults
      });

      resArr.push(caseResult);
      x = battle.eachCaseResult;
      x.push(caseResult);
      battle.eachCaseResult = x;
      await BattlesGame.updateOne({ _id: battle.id }, { $set: { eachCaseResult: x }});
      await battle.save();

      io.of("/battles").to("battles").emit("battles:round", {
        battleId: battleId,
        result: caseResult,
        img: getRandomWeightedItems(caseList.get(battle.cases[i].slug), 33),
        caseNumber: i,
      });
  
      await delay(5500);
    }

    await delay(2000)
    battle.status = 3;
    battle.privateSeed = provablyData.seed;

    // Push the updated battle to the database
    await BattlesGame.updateOne({ _id: battle.id }, {
      $set: {
            privateSeed: battle.privateSeed,
          },
    });

    await battle.save();
  
    let playerBals = [];
    for (let i = 0; i < battle.players.length; i++) {
      let bal = 0;
      for (let j = 0; j < battle.eachCaseResult.length; j++) {
        bal += parseFloat((battle.eachCaseResult[j][i].item.price).toFixed(2));
      }
      playerBals.push(bal);
    }
  
    // code to resolve winner
    let winningTeam = 0;
    let winAmount = 0;
    let isEqual = false;
    let equals = [];
  
    if (battle.game_type === 4) {
      const team1Balance = playerBals[0] + playerBals[1];
      const team2Balance = playerBals[2] + playerBals[3];
      winAmount = parseFloat(((team1Balance + team2Balance) / 2).toFixed(2));

      if(team1Balance == team2Balance) {
        winAmount = parseFloat((winAmount/2).toFixed(2));
        isEqual = true;
      } else {
        if (battle.isCrazyMode) {
          if (team1Balance < team2Balance) {
            winningTeam = 1;
          } else if (team2Balance < team1Balance) {
            winningTeam = 2;
          } else {
            isEqual = true;
          }
        } else {
          if (team1Balance > team2Balance) {
            winningTeam = 1;
          } else if (team2Balance > team1Balance) {
            winningTeam = 2;
          } else {
            isEqual = true;
          }
        }
      }

      for(let i = 0; i < 4; i++) {
        if(battle.players[i].id == "bot1" || battle.players[i].id == "bot2" || battle.players[i].id == "bot3" || battle.players[i].id == "bot4" || battle.players[i].id == "bot5" || battle.players[i].id == "bot6" || battle.players[i].id == "bot7" || battle.players[i].id == "bot8" || battle.players[i].id == "bot9" || battle.players[i].id == "bot10") continue;
        if(isEqual) {
          await User.updateOne(
            { _id: battle.players[i].id },
            {
              $inc: {
                wallet: +Math.abs(parseFloat(winAmount.toFixed(2))),
              },
            }
          );
          insertNewWalletTransaction(battle.players[i].id, +Math.abs(parseFloat(winAmount.toFixed(2))), "Battles win", { battlesGameId: battle._id });
          io.of("/battles").to(battle.players[i].id).emit("update-wallet", +Math.abs(parseFloat(winAmount.toFixed(2))));
        } else {
          if(winningTeam == 1 && i > 1) continue;
          if(winningTeam == 2 && i <= 1) continue;
          await User.updateOne({ _id: battle.players[i].id },{$inc: {wallet: +Math.abs(parseFloat(winAmount.toFixed(2))),},});
          insertNewWalletTransaction(battle.players[i].id, +Math.abs(parseFloat(winAmount.toFixed(2))), "Battles win", { battlesGameId: battle._id });
          io.of("/battles").to(battle.players[i].id).emit("update-wallet", +Math.abs(parseFloat(winAmount.toFixed(2))));
        }
      }
    } else {
      let maxBalance = Math.max(...playerBals);
      let maxPlayerIndices = [];
      let minBalance = Math.min(...playerBals);
      let minPlayerIndices = [];
  
      for (let i = 0; i < playerBals.length; i++) {
        if (playerBals[i] === maxBalance) {
          maxPlayerIndices.push(i);
        }

        if (playerBals[i] === minBalance) {
          minPlayerIndices.push(i);
        }
      }
  
      winAmount = parseFloat(playerBals.reduce((accumulator, currentValue) => accumulator + currentValue,0).toFixed(2));
  
      if (battle.isCrazyMode) {
        if (minPlayerIndices.length > 1) {
          isEqual = true;
          equals = minPlayerIndices;
          winAmount = parseFloat((winAmount / equals.length).toFixed(2));
        } else {
          winningTeam = minPlayerIndices[0] + 1;
        }
      } else {
        if (maxPlayerIndices.length > 1) {
          isEqual = true;
          equals = maxPlayerIndices;
          winAmount = parseFloat((winAmount / equals.length).toFixed(2));
        } else {
          winningTeam = maxPlayerIndices[0] + 1;
        }
      }

      for(let i = 0; i < battle.players.length; i++) {
        if(battle.players[i].id == "bot1" || battle.players[i].id == "bot2" || battle.players[i].id == "bot3" || battle.players[i].id == "bot4" || battle.players[i].id == "bot5" || battle.players[i].id == "bot6" || battle.players[i].id == "bot7" || battle.players[i].id == "bot8" || battle.players[i].id == "bot9" || battle.players[i].id == "bot10") continue;
        if(isEqual) {
          if(!equals.includes(i)) continue; 
          await User.updateOne(
            { _id: battle.players[i].id },
            {
              $inc: {
                wallet: +Math.abs(parseFloat(winAmount.toFixed(2))),
              },
            }
          );
          insertNewWalletTransaction(battle.players[i].id, +Math.abs(parseFloat(winAmount.toFixed(2))), "Battles win", { battlesGameId: battle._id });
          io.of("/battles").to(battle.players[i].id).emit("update-wallet", +Math.abs(parseFloat(winAmount.toFixed(2))));
        } else {
          if(winningTeam != i+1) continue;
          await User.updateOne(
            { _id: battle.players[i].id },
            {
              $inc: {
                wallet: +Math.abs(parseFloat(winAmount.toFixed(2))),
              },
            }
          );
          insertNewWalletTransaction(battle.players[i].id, +Math.abs(parseFloat(winAmount.toFixed(2))), "Battles win", { battlesGameId: battle._id });
          io.of("/battles").to(battle.players[i].id).emit("update-wallet", +Math.abs(parseFloat(winAmount.toFixed(2))));
        }
      }
    }

    for(let i = 0; i < equals.length; i++) {
      equals[i] += 1;
    }
  
    battle.win = {
      battleId: battleId,
      winningTeam: winningTeam,
      winAmount: winAmount,
      pc: battle.playerCount,
      bt: battle.game_type,
      isEqual: isEqual,
      equals: equals,
    };
    await battle.save();
  
    io.of("/battles").to("battles").emit("battles:finished", {
      battleId: battleId,
      price: battle.betAmount,
      winningTeam: winningTeam,
      winAmount: winAmount,
      pc: battle.playerCount,
      bt: battle.game_type,
      isEqual: isEqual,
      equals: equals,
      privateSeed: provablyData.seed,
    });
  };
  

  // Listen for new websocket connections
  io.of("/battles").on("connection", socket => {
    let loggedIn = false;
    let user = null;

    socket.join("battles");

    // Throttle connections
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
            // socket.emit("notify:success", "Successfully authenticated!");
          }
        }
        // return socket.emit("alert success", "Socket Authenticated!");
      } catch (error) {
        loggedIn = false;
        user = null;
        return socket.emit("notify:error", "Authentication token is not valid");
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

    socket.on("battles:create", async (      
      selectedCases,
      selectedType,
      selectedMode,
      totalCost,
      totalCaseCount,
      ) => {
      // Validate user input
      if (!loggedIn)
        return socket.emit("battles:error", "You are not logged in!");
      if(totalCaseCount > 50)
        return socket.emit("battles:error", "Cases amount must not be greater than 50");
      if (typeof totalCost !== "number" || isNaN(totalCost))
        return socket.emit("battles:error", "Invalid totalCost type!");
      if(selectedCases.length == 0) 
        return socket.emit("battles:error", "No cases selected!");

      if(selectedMode != '1v1' && selectedMode != '1v1v1' && selectedMode != '1v1v1v1' && selectedMode != '2v2') 
        return socket.emit("battles:error", "Not a valid gamemode! If you continue to try and break the code, you will be ip blacklisted.");

      let c = 0, verifiedCases = [];
      totalCost = 0;


      
      for (const selectedCase of selectedCases) {
        let slug;
        
        if (typeof selectedCase === 'string') {
          // Caso cuando selectedCase es un slug directo (crear batalla)
          slug = selectedCase;
        } else if (typeof selectedCase === 'object' && selectedCase.slug) {
          // Caso cuando selectedCase es un objeto (recrear batalla)
          slug = selectedCase.slug;
        } else {
          console.log('Error: Invalid case format in selectedCases.');
          return socket.emit('battles:error', 'Invalid case format in selectedCases.');
        }
        
        const box = getCaseWithCache(slug);
        if (!box) {
          console.log('Error: case not found for slug', slug);
          return socket.emit('battles:error', 'One or more of the cases you selected do not exist.');
        }
        
        verifiedCases.push(box);
        totalCost += box.price;
      }
      
      
      
      if(!selectedType && selectedType != 'standard' && selectedType != 'crazy' && selectedType != 'terminal' && selectedType != 'group')
        return socket.emit("battles:error", "Invalid game type!");
      if(!selectedMode && selectedMode != '1v1' && selectedMode != '1v1v1' && selectedMode != '1v1v1v1' && selectedMode != '2v2')
        return socket.emit("battles:error", "Invalid mode type!");

      // Get battles enabled status
      const isEnabled = getBattlesState();
  
      // If battles is disabled
      if (!isEnabled) {
        return socket.emit(
          "battles:error",
          "Battles is currently disabled! Contact admins for more information."
        );
      }   

      try {
        // Get user from database
        const dbUser = await User.findOne({ _id: user.id });

        // If user has restricted bets
        if (dbUser.betsLocked) {
          return socket.emit(
            "battles:error",
            "Your account has an betting restriction. Please contact support for more information."
          );
        }

        // If user can afford this bet
        if (dbUser.wallet < parseFloat(totalCost.toFixed(2))) {
          return socket.emit("battles:error", "You can't afford to create this battle!");
        }
        const gameTypeInt = selectedMode == '1v1' ? 1 : selectedMode == '1v1v1' ? 2 : selectedMode == '1v1v1v1' ? 3 : selectedMode == '2v2' ? 4 : 0;
        const newGame = BattlesGame({
          betAmount: totalCost,
          privateGame: false,

          game_type: gameTypeInt,

          isCrazyMode: "crazy" == String(selectedType),

          privateHash: "Not Generated",
          publicSeed: "Not Generated",
          privateSeed: "Not Generated",

          playerCount: gameTypeInt == 1 ? 2 : gameTypeInt == 2 ? 3 : gameTypeInt == 3 ? 4 : gameTypeInt == 4 ? 4 : 0,
          cases: verifiedCases,

          eachCaseResult: [],

          players: [{
            id: dbUser.id,
            username: dbUser.username,
            pfp: dbUser.avatar,
            level: getVipLevelFromWager(dbUser.wager),
          }],

          _creator: dbUser._id,

          isBotCalled: false,

          status: 1,
        });

        await newGame.save();
        PENDING_GAMES.push(newGame);

        // Remove bet amount from user's balance
        await User.updateOne(
          { _id: user.id },
          {
            $inc: {
              wallet: -Math.abs(parseFloat(totalCost.toFixed(2))),
              wager: Math.abs(parseFloat(totalCost.toFixed(2))),
              wagerNeededForWithdraw: -Math.abs(
                parseFloat(totalCost.toFixed(2))
              ),
              bets_placed: +1
            },
          }
        );

        insertNewWalletTransaction(user.id, -Math.abs(parseFloat(totalCost.toFixed(2))), "Battles creation", { battlesGameId: newGame._id });

        // add wagered to rakeback
        addWageredToRakeBack(user.id, Math.abs(parseFloat(totalCost.toFixed(2))))

        // Update local wallet
        io.of("/battles").to(user.id).emit("update-wallet", -Math.abs(parseFloat(totalCost.toFixed(2))));

        // Update user's race progress if there is an active race
        await checkAndEnterRace(user.id, Math.abs(parseFloat(totalCost.toFixed(2))));

        // Calculate house edge
        const houseRake = parseFloat(totalCost.toFixed(2)) * config.games.battles.houseEdge;

        // Apply 5% rake to current race prize pool
        await checkAndApplyRakeToRace(houseRake * 0.05);

        // Apply user's rakeback if eligible
        await checkAndApplyRakeback(user.id, houseRake);

        // Apply cut of house edge to user's affiliator
        await checkAndApplyAffiliatorCut(user.id, houseRake, totalCost);

        io.of("/battles").to("battles").emit("battles:new", {
          id: newGame._id,
          price: newGame.betAmount,
          cases: newGame.cases,
          casesRoundResults: [],
          players: [{
            id: user._id,
            username: user.username,
            pfp: user.avatar,
            level: getVipLevelFromWager(user.wager),
          }],
          isCrazyMode: newGame.isCrazyMode,
          gameType: newGame.game_type,
          status: newGame.status,
          playerCount: newGame.playerCount,
        });
        return socket.emit("battles:created", newGame._id);
      } catch (error) {
        console.error(error);

        return socket.emit(
          "battles:error",
          "There was an error while proccessing your battles creation"
        );
      }
    });

    socket.on("battles:reqdata", async (id) => {
      try {
        if(!id)
          return socket.emit("battles:error", "Not a valid battle id!");

        
        const gameData = PENDING_GAMES.find(game => String(game._id) === id) ? PENDING_GAMES.find(game => String(game._id) === id) :  await BattlesGame.findOne({ _id: id });

        if(!gameData)
          return socket.emit("battles:error", "Not a valid battle id!");

        const gd = {
          id: gameData._id,
          price: gameData.betAmount,
          cases: gameData.cases,
          casesRoundResults: gameData.eachCaseResult,
          players: gameData.players,
          isCrazyMode: gameData.isCrazyMode,
          hash: gameData.privateHash,
          publicSeed: gameData.publicSeed,
          privateSeed: gameData.privateSeed,
          gameType: gameData.game_type,
          status: gameData.status,
          win: gameData.win,
          playerCount: gameData.game_type == 1 ? 2 : gameData.game_type == 2 ? 3 : gameData.game_type == 3 ? 4 : gameData.game_type == 4 ? 4 : 0,
        };
        return socket.emit("battles:data", gd);
      } catch (error) {
        console.error(error);

        return socket.emit(
          "battles:error",
          "There was an error while getting battles data"
        );
      }
    });
    
    socket.on("battles:join", async (battleId, slot) => {
      try {
        if (!loggedIn)
          return socket.emit("battles:error", "You are not logged in!");
        
        user = await User.findOne({ _id: user.id });

        const pendingGame = PENDING_GAMES.find(game => String(game._id) === String(battleId));
        let battle;
    
        if (pendingGame) {
          battle = pendingGame;
        } else {
          battle = await BattlesGame.findOne({ _id: battleId });
          if (!battle) {
            return socket.emit("battles:error", "The game you are trying to join is invalid!");
          }
        }

        // Only allow joining if battle hasn't started
        if (battle.status !== 1) {
          return socket.emit("battles:error", "This battle has already started!");
        }

        // Validate slot parameter
        if (typeof slot !== 'number' || slot < 0 || slot >= battle.playerCount) {
          return socket.emit("battles:error", "Invalid slot selection!");
        }

        // Check if slot is already taken
        if (battle.players[slot]) {
          return socket.emit("battles:error", "This slot is already taken!");
        }

        const betAmount = battle.betAmount;

        if(betAmount > user.wallet) 
          return socket.emit("battles:error", "You can't afford to join this game!")
        
        if(isPlayerAlreadyJoined(battle.players, user.id)) 
          return socket.emit("battles:error", "You have already joined this game!");

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
              bets_placed: +1
            },
          }
        );
        insertNewWalletTransaction(user.id, -Math.abs(parseFloat(betAmount.toFixed(2))), "Battles join", { battlesGameId: battle._id });

        // add wagered to rakeback
        addWageredToRakeBack(user.id, Math.abs(parseFloat(betAmount.toFixed(2))))

        // Update local wallet
        io.of("/battles").to(user.id).emit("update-wallet", -Math.abs(parseFloat(betAmount.toFixed(2))));

        // Update user's race progress if there is an active race
        await checkAndEnterRace(
          user.id,
          Math.abs(parseFloat(betAmount.toFixed(2)))
        );

        const houseRake = parseFloat(betAmount.toFixed(2)) * config.games.crash.houseEdge;
        await checkAndApplyRakeToRace(houseRake * 0.05);
        await checkAndApplyRakeback(user.id, houseRake);
        await checkAndApplyAffiliatorCut(user.id, houseRake, betAmount);

        const player = {
          id: user.id,
          username: user.username,
          level: getVipLevelFromWager(user.wager),
          pfp: user.avatar
        };

        // Initialize players array with nulls if needed
        if (!battle.players) {
          battle.players = new Array(battle.playerCount).fill(null);
        }
        
        // Fill any gaps in the players array with nulls
        while (battle.players.length < battle.playerCount) {
          battle.players.push(null);
        }

        // Place player in the selected slot
        let newPlayers = [...battle.players];
        newPlayers[slot] = player;

        await BattlesGame.findOneAndUpdate({ _id: battleId }, { $set: { players: newPlayers }});

        const index = PENDING_GAMES.findIndex(game => String(game._id) === String(battleId));
        if (index !== -1) {
          PENDING_GAMES[index].players = newPlayers;
          battle = PENDING_GAMES[index];
        }

        io.of("/battles").to("battles").emit("battles:join", {
          battleId: battle._id,
          player: slot + 1, // Convert to 1-based for display
          user: player
        });

        // Count non-null players to check if game is full
        const filledSlots = newPlayers.filter(p => p !== null).length;
        if(filledSlots === battle.playerCount) {
          // Make sure all slots have either a real player or a bot before starting
          const hasInvalidSlot = newPlayers.some(p => p === null);
          if (hasInvalidSlot) {
            return socket.emit("battles:error", "Cannot start game - some slots are empty!");
          }
          runGame(battle._id);
        }

      } catch (error) {
        console.error(error);
        return socket.emit(
          "battles:error",
          "There was an error while joining this battle"
        );
      }
    });

    socket.on("battles:callbot", async (battleId) => {
      try {
        if (!loggedIn)
          return socket.emit("battles:error", "You are not logged in!");

        let battle = PENDING_GAMES.find(game => String(game._id) === String(battleId));
        
        // Check if battle exists and is in correct state
        if (!battle) {
          return socket.emit("battles:error", "Battle not found!");
        }

        if (battle.status !== 1) {
          return socket.emit("battles:error", "Battle has already started!");
        }
        
        if(String(battle._creator) !== user.id) {
          return socket.emit(
            "battles:error",
            "To call bots you must be the creator!"
          );
        }

        // Check if bots have already been called
        if (battle.isBotCalled) {
          return socket.emit("battles:error", "Bots have already been called for this battle!");
        }

        const bot1 = {
          id: "bot1",
          username: "Road Scientist",
          pfp: "https://i.imgur.com/Qi5nO4K.png"
        };

        const bot2 = {
          id: "bot2",
          username: "Missile Silo Scientist",
          pfp: "https://i.imgur.com/4QA0VVn.png"
        };

        const bot3 = {
          id: "bot3",
          username: "Heavy Scientist",
          pfp: "https://i.imgur.com/Wja3MKy.png"
        };

        const bot4 = {
          id: "bot4",
          username: "Arctic Scientist",
          pfp: "https://i.imgur.com/U8X5BQa.png"
        };

        const bot5 = {
          id: "bot5",
          username: "Tunnel Dweller",
          pfp: "https://i.imgur.com/UxSz8oD.png"
        };

        const bot6 = {
          id: "bot6",
          username: "NVG Scientist",
          pfp: "https://i.imgur.com/rNJEmUD.png"
        };

        const bot7 = {
          id: "bot7",
          username: "Roaming Scientist",
          pfp: "https://i.imgur.com/dKYnUQN.png"
        };

        const bot8 = {
          id: "bot8",
          username: "Outpost Scientist",
          pfp: "https://i.imgur.com/Zauagb1.png"
        };

        const bot9 = {
          id: "bot9",
          username: "Excavator Scientist",
          pfp: "https://i.imgur.com/3wlSjdX.png"
        };

        const bot10 = {
          id: "bot10",
          username: "Military Base Scientist",
          pfp: "https://i.imgur.com/3wlSjdX.png"
        };

        // Find available slots
        let availableSlots = [];
        for(let i = 0; i < battle.playerCount; i++) {
          if(!battle.players[i]) {
            availableSlots.push(i);
          }
        }

        if(availableSlots.length === 0) {
          return socket.emit("battles:error", "No available slots for bots!");
        }

        // Randomly select bots for the positions
        const allBots = [bot1, bot2, bot3, bot4, bot5, bot6, bot7, bot8, bot9, bot10];
        const selectedBots = [...allBots].sort(() => Math.random() - 0.5).slice(0, 3);
        const [randomBot1, randomBot2, randomBot3] = selectedBots;

        // Map bots to available slots
        let newPlayers = [...battle.players];
        for(let i = 0; i < availableSlots.length; i++) {
          let bot;
          if(i === 0) bot = randomBot1;
          else if(i === 1) bot = randomBot2;
          else if(i === 2) bot = randomBot3;
          
          newPlayers[availableSlots[i]] = bot;
          
          io.of("/battles").to("battles").emit("battles:join", {
            battleId: battle._id,
            player: availableSlots[i] + 1,
            user: bot
          });
        }

        await BattlesGame.findOneAndUpdate({ _id: battleId }, { $set: { players: newPlayers, isBotCalled: true }});

        const index = PENDING_GAMES.findIndex(game => String(game._id) === String(battleId));
        PENDING_GAMES[index].players = newPlayers;
        PENDING_GAMES[index].isBotCalled = true;
        battle = PENDING_GAMES[index];

        // Check if game is full
        const filledSlots = newPlayers.filter(p => p !== null).length;
        if(filledSlots === battle.playerCount) {
          runGame(battle._id);
        }

      } catch (error) {
        console.error(error);
        return socket.emit(
          "battles:error",
          "There was an error while calling bots for this battle"
        );
      }
    });

    // ... rest of the code remains the same ...
  });
};

// Export functions
module.exports = {
  listen,
  getCases,
  caseList,
};
