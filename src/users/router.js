const Router = require("@koa/router");

const { createUser, destroyUser, getUser } = require("./handlers");

const usersRouter = new Router({
  prefix: "/users"
});

usersRouter.get("/", async (ctx, next) => {
  ctx.body = "affe";
  await next();
});
usersRouter.post("/", createUser);
usersRouter.get("/:userId", getUser);
// usersRouter.get("/:userId", async (ctx, next) => {
//   ctx.body = "wat?";
//   next();
// });
usersRouter.del("/:userId", destroyUser);

module.exports = usersRouter;
