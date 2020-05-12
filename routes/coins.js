const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Coins = require("../models/Coins");

// @route   GET api/coins
// @desc    Get user's coins
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Get coins by user id
    const coins = await Coins.find({ user: req.user.id }).sort({ date: -1 });
    res.json(coins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/coins
// @desc    Add new coin list (only for the first time)
// @access  Private
router.post("/", auth, async (req, res) => {
  const { coins } = req.body;
  try {
    let coinList = await Coins.find({ user: req.user.id });
    //check if user has a coinlist
    if (coinList[0]) {
      return res.status(400).json({ msg: "User already have a coinlist" });
    }
    const newCoins = new Coins({
      coins,
      user: req.user.id,
    });

    coinList = await newCoins.save();

    res.json(coinList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/coins/:id
// @desc    Add coin
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const coinList = await Coins.findById(req.params.id);

    //check if user has a coinlist
    if (!coinList) {
      return res.status(404).json({ msg: "Coin list not found" });
    }
    //check for maximum length
    if (coinList.coins.length > 3) {
      return res.status(400).json({ msg: "Max length reached" });
    }
    // check if the coin was already added
    const finById = coinList.coins.find((coin) => coin.name === req.body.name);
    if (finById) {
      return res.status(400).json({ msg: "Coin already added" });
    }
    //check user
    if (coinList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const newCoin = {
      name: req.body.name,
      symbol: req.body.symbol,
    };
    // add coin
    coinList.coins.unshift(newCoin);
    coinList.save();

    res.json(coinList.coins);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Coin list not found" });
    }
    res.status(500).send("Server Error");
  }
});
// @route   PUT api/coins/:id/:coin_id
// @desc    Modify existing coin
// @access  Private
router.put("/:id/:coin_id", auth, async (req, res) => {
  try {
    const coinList = await Coins.findById(req.params.id);

    //pull out coin
    const coin = coinList.coins.find(
      (coin) => coin.name === req.params.coin_id
    );
    // check if coin exists
    if (!coin) {
      return res.status(404).json({ msg: "Coin not found", coin: coinList });
    }
    //check user
    if (coinList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // create new coin
    const newCoin = {
      name: req.body.name,
      symbol: req.body.symbol,
    };

    // check if new coin already exists
    const findCoin = coinList.coins.find((coin) => coin.name === newCoin.name);

    if (findCoin) {
      return res.status(404).json({ msg: "Coin already exists" });
    }

    // Get and replace index
    const replaceIndex = coinList.coins.indexOf(coin);

    coinList.coins[replaceIndex] = newCoin;

    coinList.save();
    res.json(coinList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/coins/:id/:coin_id
// @desc    Delete a coin from the list
// @access  Private
router.delete("/:id/:coin_id", auth, async (req, res) => {
  try {
    const coinList = await Coins.findById(req.params.id);

    //pull out coin
    const coin = coinList.coins.find(
      (coin) => coin.name === req.params.coin_id
    );
    // check if coin exists
    if (!coin) {
      return res.status(404).json({ msg: "Coin not found" });
    }
    //check user
    if (coinList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get and remove index
    const removeIndex = coinList.coins.indexOf(coin);

    coinList.coins.splice(removeIndex, 1);

    coinList.save();
    res.json(coinList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
