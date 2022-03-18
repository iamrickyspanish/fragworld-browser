const axios = require("axios");

const getFavorites = async (ctx, next) => {
  const { data: favorites } = await axios.get(
    process.env.FAVORITES_SERVICE_URL,
    {
      params: ctx.request.query
    }
  );
  ctx.body = favorites;
  next();
};

const createFavorite = async (ctx, next) => {
  const data = ctx.request.body;
  const { data: favorite } = await axios.post(
    process.env.FAVORITES_SERVICE_URL,
    data
  );
  ctx.body = favorite;
  ctx.response.status = 201;
  next();
};

const destroyFavorite = async (ctx, next) => {
  await axios.delete(
    `${process.env.FAVORITES_SERVICE_URL}/${ctx.params.userId}`
  );
  ctx.body = { msg: "ok" };
  next();
};

module.exports = {
  getFavorites,
  createFavorite,
  destroyFavorite
};
