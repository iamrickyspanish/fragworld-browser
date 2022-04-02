const { json, send, createError } = require("micro");
const query = require("micro-query");
const DbService = require("./src/dbService");
const url = require("url");

const allowedMethods = Object.freeze(["GET", "POST", "DELETE"]);

const mapRequestToId = (req) => {
  const { pathname } = new url.URL(req.url, `http://${req.headers.host}`);
  return pathname.slice(1).split("/")[0];
};

const dbService = new DbService();

module.exports = async (req, res) => {
  if (!dbService.isReady)
    throw createError(500, "not ready yet. Try again in a few seconds");
  if (!allowedMethods.includes(req.method))
    throw createError(400, "method not allowed");

  switch (req.method) {
    case "GET":
      const queryData = query(req);
      if (!queryData.userId) throw createError(400, "more information needed: userId");

      const favorites = await dbService.index(queryData);
      // if (queryData.game)
      //   favorites = favorites.map()
      return send(res, 200, favorites);
    case "POST":
      const data = await json(req);
      const favorite = await dbService.create(data);
      return send(res, 201, favorite);
    case "DELETE":
      const id = mapRequestToId(req);
      await dbService.destroy(id);
      return send(res, 200, { message: "ok" });
  }
  throw createError(400, "invalid request");
};
