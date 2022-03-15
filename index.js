const Koa = require("koa");
const app = new Koa();
const serversRouter = require("./src/servers/router");
const gamesRouter = require("./src/games/router");
const usersRouter = require("./src/users/router");
const bodyParser = require("koa-bodyparser");

app
  .use(bodyParser())
  .use(gamesRouter.routes())
  .use(gamesRouter.allowedMethods())
  .use(serversRouter.routes())
  .use(serversRouter.allowedMethods())
  .use(usersRouter.routes())
  .use(usersRouter.allowedMethods())
  .listen(3000);
