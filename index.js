const { sendError, send, createError, json } = require("micro");
const query = require("micro-query");

const mongoose = require("mongoose");
const GameModel = require("./db/models/Game");
const ServerSnapshotModel = require("./db/models/ServerSnapshot");

module.exports = async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      return send(res, 200, "ok");
    }

    try {
      await mongoose.connect(process.env.DB_HOST);
    } catch (err) {
      throw createError(400, `DB ${err}`);
    }

    if (req.method === "GET") {
      if (req.url.startsWith("/games")) {
        const games = await GameModel.find({});
        return send(res, 200, games);
      } else if (req.url.startsWith("/servers")) {
        let bodyData = {};
        try {
          bodyData = await json(req);
        } catch (_) {
          bodyData = {};
        }
        const queryData = query(req);
        const { game } = {
          ...queryData,
          ...bodyData
        };
        const gameModel = await GameModel.findOne({ _id: game });
        if (!gameModel) throw createError(404, "unknown game");
        const serverSnapshots = await ServerSnapshotModel.find({ game });
        return send(
          res,
          200,
          Array.isArray(serverSnapshots) ? serverSnapshots : []
        );
      }
      throw createError(400, "invalid format");
    }
  } catch (e) {
    sendError(req, res, e);
  }
};
