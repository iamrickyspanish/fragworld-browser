const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: "string",
  host: "string",
  port: "number",
});

const ServerModel = mongoose.model("Server", schema);

module.exports = ServerModel;
