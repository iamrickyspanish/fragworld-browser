const axios = require("axios");

const createUser = async (ctx, next) => {
  const data = ctx.request.body;
  const { data: user } = await axios.post(process.env.USERS_SERVICE_URL, data);
  ctx.body = user;
  ctx.response.status = 201;
  next();
};

const destroyUser = async (ctx, next) => {
  await axios.delete(`${process.env.USERS_SERVICE_URL}/${ctx.params.userId}`);
  ctx.body = { msg: "ok" };
  next();
};

const getUser = async (ctx, next) => {
  const { data: user } = await axios.get(
    `${process.env.USERS_SERVICE_URL}/${ctx.params.userId}`
  );
  ctx.body = user;
  next();
};

module.exports = {
  createUser,
  getUser,
  destroyUser
};
