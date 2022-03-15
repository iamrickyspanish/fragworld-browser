const GameModel = require("../../db/models/Game");
const mongoose = require("mongoose");

const getGames = async (ctx, next) => {
  await mongoose.connect(process.env.DB_HOST);
  const games = await GameModel.find({});
  ctx.body = games;
  mongoose.connection.close();
  next();
};

module.exports = {
  getGames
};
