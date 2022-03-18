const Router = require("@koa/router");

const { getFavorites, createFavorite, destroyFavorite } = require("./handlers");

const favoriteRouter = new Router({
  prefix: "/favorites"
});

favoriteRouter.get("/", getFavorites);
favoriteRouter.post("/", createFavorite);
favoriteRouter.del("/", destroyFavorite);

module.exports = favoriteRouter;
