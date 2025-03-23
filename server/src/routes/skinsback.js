const express = require("express");
const router = (module.exports = express.Router());

const { validateJWT } = require("../middleware/auth");

const { v4: uuidv4 } = require("uuid");

const { getDepositState, getWithdrawState, } = require("../controllers/site-settings");
const controller = require("../controllers/skinsback");

router.get("/", async (req, res) => {
  try {
    let status = await controller.main();
    res.json(status);
  } catch (e) {
    res.json(e);
  }
});

router.post("/create_order", validateJWT, async (req, res) => {
  try {
    // Check if deposits are enabled
    const isEnabled = getDepositState();

    // If deposits are not enabled
    if (!isEnabled) {
      return res.status(400).json({
        error: "Deposits are currently disabled! Contact admins for more information"
      });
    }

    let order_id = uuidv4();
    let hash = await controller.create_order(order_id, req.body.user_id);
    
    if (!hash) {
      return res.status(500).json({
        error: "Failed to create deposit order"
      });
    }

    return res.json({ hash });
  } catch (e) {
    console.error(`api create_order error:`, e);
    
    // Handle specific SkinsBack errors
    if (e.error_code === -4 && e.error_message === 'shop_not_active') {
      return res.status(503).json({
        error: "Deposit service temporarily unavailable. Please try again later or contact support."
      });
    }
    
    return res.status(500).json({
      error: e.message || "Failed to create deposit order. Please try again later."
    });
  }
});

router.post("/callback/result", async (req, res) => {
  try {
    let result = await controller.result(req.body);
    if (!result || result.success === true) return res.sendStatus(200);
    return res.sendStatus(500);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get("/market/items/csgo/:user_id", async (req, res) => {
  try {
    // Check if deposits are enabled
    const isEnabled = getWithdrawState();

    // If deposits are not enabled
    if (!isEnabled) {
      res.status(400);
      return next(
        new Error(
          "Withdraws are currently disabled! Contact admins for more information"
        )
      );
    }
    let items = await controller.load_market_items_CSGO(req.params.user_id);
    return res.json(items);
  } catch (e) {
    console.error(`api csgo market_items`, e);
    res.sendStatus(500);
  }
});

router.get("/market/items/rust/:user_id", async (req, res) => {
  try {
    // Check if deposits are enabled
    const isEnabled = getWithdrawState();

    // If deposits are not enabled
    if (!isEnabled) {
      res.status(400);
      return next(
        new Error(
          "Withdraws are currently disabled! Contact admins for more information"
        )
      );
    }
    let items = await controller.load_market_items_RUST(req.params.user_id);
    return res.json(items);
  } catch (e) {
    console.error(`api rust market_items`, e);
    res.sendStatus(500);
  }
});

router.get("/market/items/dota2/:user_id", async (req, res) => {
  try {
    // Check if deposits are enabled
    const isEnabled = getWithdrawState();

    // If deposits are not enabled
    if (!isEnabled) {
      res.status(400);
      return next(
        new Error(
          "Withdraws are currently disabled! Contact admins for more information"
        )
      );
    }
    let items = await controller.load_market_items_DOTA2(req.params.user_id);
    return res.json(items);
  } catch (e) {
    console.error(`api dota2 market_items`, e);
    res.sendStatus(500);
  }
});

router.post("/withdraw/items/csgo", validateJWT, async (req, res, next) => {
  try {
    let resp = await controller.withdraw_itemsCSGO(
      req.user.id,
      req.body.items,
      req.body.tradelink
    );
    return res.json(resp);
  } catch (e) {
    console.error(`api csgo withdraw_items`, e);
    res.json({ success: false, error: `API error!` });
  }
});

router.post("/withdraw/items/rust", validateJWT, async (req, res) => {
  try {
    let resp = await controller.withdraw_itemsRUST(
      req.user.id,
      req.body.items,
      req.body.tradelink
    );
    return res.json(resp);
  } catch (e) {
    console.error(`api rust withdraw_items`, e);
    res.json({ success: false, error: `API error!` });
  }
});

router.post("/withdraw/items/dota2", validateJWT, async (req, res) => {
  try {
    let resp = await controller.withdraw_itemsDOTA2(
      req.user.id,
      req.body.items,
      req.body.tradelink
    );
    return res.json(resp);
  } catch (e) {
    console.error(`api dota2 withdraw_items`, e);
    res.json({ success: false, error: `API error!` });
  }
});