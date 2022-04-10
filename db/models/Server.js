const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: String,
  host: String,
  port: Number,
  countryCode: {
    type: String,
    length: 2
  },
  game: {
    type: String, //mongoose.Schema.Types.ObjectId,
    ref: "Game"
  }
});

const ServerModel = mongoose.model("Server", schema);

module.exports = ServerModel;
