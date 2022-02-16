const { sendError, send, createError, json } = require("micro");
const cors = require("micro-cors")();
const mongoose = require("mongoose");
const ServerModel = require("./src/serverModel");

module.exports = cors(async (req, res) => {
  try {
    try {
      await mongoose.connect(process.env.DB_HOST);
    } catch (err) {
      throw createError(400, `DB ${err}`);
    }

    if (req.method === "GET") {
      const { type } = await json(req);
      const result = await ServerModel.find({ type });
      return send(res, 200, result);
    }
    throw createError(400, "invalid format");
  } catch (e) {
    sendError(req, res, e);
  }
});
