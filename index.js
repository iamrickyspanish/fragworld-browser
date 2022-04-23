const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const cors = require('@koa/cors');

const serversRouter = require("./src/servers/router");
const gamesRouter = require("./src/games/router");
const usersRouter = require("./src/users/router");
const favoritesRouter = require("./src/favorites/router");
const filterConfigsRouter = require("./src/filterConfigs/router");
const authRouter = require("./src/auth/router");

const addRouter = (app, router) =>
  app.use(router.routes()).use(router.allowedMethods());

const SESSION_CONFIG = {
  maxAge: 86400000
};

const app = new Koa();

if (process.env.NODE_ENV !== "production")
  app.use(cors({
    origin: process.env.CORS_ORIGIN
  }))

app.keys = ["secret-new", "secret-old"];

app.use(session(SESSION_CONFIG, app));

app.use(bodyParser());
addRouter(app, gamesRouter);
addRouter(app, serversRouter);
addRouter(app, usersRouter);
addRouter(app, favoritesRouter);
addRouter(app, filterConfigsRouter);
addRouter(app, authRouter);
app.listen(3000);
