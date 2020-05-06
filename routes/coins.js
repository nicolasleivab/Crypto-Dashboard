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
    const newCoins = new Coins({
      coins,
      user: req.user.id,
    });

    const coinList = await newCoins.save();

    res.json(coinList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/coins/:id
// @desc    Modify coin list (add or edit coins)
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const coinList = await Coins.findById(req.params.id);

    if (!coinList) {
      return res.status(404).json({ msg: "Coin list not found" });
    }
    //check for maximum length
    if (coinList.coins.length > 3) {
      return res.status(400).json({ msg: "Max length reached" });
    }
    // check if the coin was already added
    const finById = coinList.coins.find((name) => name.id === req.body.id);
    if (finById) {
      return res.status(400).json({ msg: "Coin already added" });
    }

    const newCoin = {
      name: req.body.name,
      symbol: req.body.symbol,
      id: req.body.id,
    };

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
/*
// @route   PUT api/coins/:id
// @desc    Modify coin list (add or edit coins)
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const coinList = await Coins.findById(req.params.id);
    
    const newCoin = {
      name: req.body.name,
      symbol: req.body.symbol,
      id: req.body.id,
    };

    coinList.coins.unshift(newCoin);
    coinList.save();
    
    res.json(coinList.coins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
*/

// @route   DELETE api/coins/:id
// @desc    Delete a coin from the list
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Coin list modified");
});

module.exports = router;
