const ServerSnapshotModel = require("../../db/models/ServerSnapshot");
const GameModel = require("../../db/models/Game");
const mongoose = require("mongoose");

const getServers = async (ctx, next) => {
  await mongoose.connect(process.env.DB_HOST);
  const { game } = ctx.request.query;
  const gameModel = await GameModel.findOne({ _id: game });
  if (!gameModel) ctx.throw(404, `unknown game "${game}"`);
  const serverSnapshots = await ServerSnapshotModel.find({ game });
  ctx.body = serverSnapshots;
  mongoose.connection.close();
  next();
};

module.exports = {
  getServers
};
