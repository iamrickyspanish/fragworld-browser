const Router = require("@koa/router");

const { getServers } = require("./handlers");

const serversRouter = new Router({
  prefix: "/servers"
});

serversRouter.get("/", getServers);

module.exports = serversRouter;
