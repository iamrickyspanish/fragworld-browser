const { sendError, send, createError, json } = require("micro");
const query = require("micro-query");
const cors = require("micro-cors")({
  origin: process.env.CORS_ORIGIN || "*",
  allowCredentials: false
});
const mongoose = require("mongoose");
const ServerModel = require("./src/serverModel");
const axios = require("axios");

module.exports = cors(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      send(req, 200, "ok");
    }

    try {
      await mongoose.connect(process.env.DB_HOST);
    } catch (err) {
      throw createError(400, `DB ${err}`);
    }

    if (req.method === "GET") {
      let bodyData = {};
      try {
        bodyData = await json(req);
      } catch (_) {
        bodyData = {};
      }
      const queryData = query(req);
      const { type } = {
        ...queryData,
        ...bodyData
      };
      const servers = await ServerModel.find({ type });

      const data = {
        type,
        hosts: servers.map(({ host, port }) => `${host}:${port}`)
      };
      const result = await axios.get(process.env.RELAY_URL, { data });
      const serverData = await result.data;
      return send(res, 200, serverData);
    }
    throw createError(400, "invalid format");
  } catch (e) {
    sendError(req, res, e);
  }
});
