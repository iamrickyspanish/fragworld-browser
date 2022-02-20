const { sendError, send, createError, json } = require("micro");
const cors = require("micro-cors")({
  origin: process.env.CORS_ORIGIN || "*"
});
const mongoose = require("mongoose");
const ServerModel = require("./src/serverModel");
const axios = require("axios");

module.exports = cors(async (req, res) => {
  try {
    try {
      await mongoose.connect(process.env.DB_HOST);
    } catch (err) {
      throw createError(400, `DB ${err}`);
    }

    if (req.method === "GET") {
      const { type } = await json(req);
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

// hosts: [
//   "148.251.68.215:27015",
//   "45.90.217.186:27015",
//   "62.140.250.10:27015"
// ]
