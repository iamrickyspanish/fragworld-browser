const schema = new mongoose.Schema({
  type: "string",
  mod: "string",
  name: "string"
});

const GameModel = mongoose.model("Server", schema);

module.exports = GameModel;
