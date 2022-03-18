const Router = require("@koa/router");

const { login, logout } = require("./handlers");

const authRouter = new Router({
  prefix: "/auth"
});

authRouter.post("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter;
