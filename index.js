const Koa = require("koa");
const app = new Koa();
const serversRouter = require("./src/servers/router");
const gamesRouter = require("./src/games/router");
const usersRouter = require("./src/users/router");
const favoritesRouter = require("./src/favorites/router");
const authRouter = require("./src/auth/router");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");

const addRouter = (app, router) =>
  app.use(router.routes()).use(router.allowedMethods());

const SESSION_CONFIG = {
  maxAge: 86400000
};

app.use(session(SESSION_CONFIG, app));
app.use(bodyParser());
addRouter(app, gamesRouter);
addRouter(app, serversRouter);
addRouter(app, usersRouter);
addRouter(app, favoritesRouter);
addRouter(app, authRouter);
app.listen(3000);
