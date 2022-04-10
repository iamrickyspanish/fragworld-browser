const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  game: String,
  host: String,
  port: Number,
  countryCode: { type: String, lenght: 2 },
  countryName: String,
  players: Number,
  maxPlayers: Number,
  map: String,
  name: String,
  ping: Number,
  serverId: {
    type: mongoose.Schema.ObjectId,
    ref: "Server"
  }
});

const ServerSnapshotModel = mongoose.model("ServerSnapshot", schema);

module.exports = ServerSnapshotModel;
