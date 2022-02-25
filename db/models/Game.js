const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: String,
  type: String,
  mod: String,
  name: String,
  defaultPort: Number
});

const GameModel = mongoose.model("Game", schema);

module.exports = GameModel;
