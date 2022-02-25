const { sendError, send, createError, json } = require("micro");
const query = require("micro-query");

const mongoose = require("mongoose");
const ServerModel = require("./db/models/Server");
const GameModel = require("./db/models/Game");

const axios = require("axios");

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
      if (req.url === "/games") {
        const games = await GameModel.find({});
        send(res, 200, games);
      } else {
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
        const servers = await ServerModel.find({ game });
        if (!servers || !servers.length) send(res, 200, []);
        const data = {
          type: gameModel.type,
          hosts: servers.map(({ host, port }) => `${host}:${port}`)
        };
        const result = await axios.get(process.env.RELAY_URL, { data });
        return send(res, 200, Array.isArray(result?.data) ? result.data : []);
      }
      throw createError(400, "invalid format");
    }
  } catch (e) {
    sendError(req, res, e);
  }
};
