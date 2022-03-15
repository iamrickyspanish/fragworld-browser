const Router = require("@koa/router");

const { getGames } = require("./handlers");

const gamesRouter = new Router({
  prefix: "/games"
});

gamesRouter.get("/", getGames);

module.exports = gamesRouter;
