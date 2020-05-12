const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// coin list subSchema
const CoinSchema = Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CoinsSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  coins: [CoinSchema],
});

module.exports = mongoose.model("coins", CoinsSchema);
