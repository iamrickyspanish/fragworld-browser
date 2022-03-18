const Router = require("@koa/router");

const { createUser, destroyUser, getUser } = require("./handlers");

const usersRouter = new Router({
  prefix: "/users"
});

usersRouter.post("/", createUser);
usersRouter.get("/:userId", getUser);
usersRouter.del("/:userId", destroyUser);

module.exports = usersRouter;
