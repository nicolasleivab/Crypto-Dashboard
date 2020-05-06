const express = require("express");
const router = express.Router();

// @route   GET api/coins
// @desc    Get user's coins
// @access  Private
router.get("/", (req, res) => {
  res.send("Get coins");
});

// @route   POST api/coins
// @desc    Add new coin
// @access  Private
router.post("/", (req, res) => {
  res.send("Coin added");
});

// @route   PUT api/coins/:id
// @desc    Modify coin list
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Coin list modified");
});

// @route   DELETE api/coins/:id
// @desc    Delete a coin from the list
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Coin list modified");
});

module.exports = router;
