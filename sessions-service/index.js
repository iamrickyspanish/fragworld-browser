const { json, send, createError } = require("micro");
const { createClient } = require("redis");
const { v4: uuid } = require("uuid");
const query = require("micro-query");

const client = createClient();

const allowedMethods = Object.freeze(["GET", "POST", "DELETE"]);

const mapRequestToKey = (req) => {
  const { pathname } = new url.URL(req.url, `http://${req.headers.host}`);
  return pathname.slice(1).split("/")[0];
};

module.exports = async (req, res) => {
  if (!allowedMethods.includes(req.method))
    throw createError(400, "method not allowed");

  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect({
    host: process.env.DB_HOST
  });

  switch (req.method) {
    case "GET":
      const sessionKey = mapRequestToKey(req);
      const createdAt = await client.get(sessionKey);
      //check created at date blablabla
      return send(res, 200, { sessionKey, createdAt });
    case "POST":
      const sessionKey = uuid();
      const createdAt = new Date().toISOString();
      await client.set(sessionKey, createdAt);
      return send(res, 200, { sessionKey, createdAt });
    case "DELETE":
      const sessionKey = mapRequestToKey(req);
      await client.get(sessionKey);
      return send(res, 200, { status: "ok" });
  }
};
