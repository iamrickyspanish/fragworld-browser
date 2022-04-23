const axios = require("axios");

const getConfigs = async (ctx, next) => {
  const { data } = await axios.get(process.env.FILTER_CONFIG_SERVICE_URL, {
    params: ctx.request.query
  });
  ctx.body = data;
  next();
};

const getConfig = async (ctx, next) => {
  const { data } = await axios.get(
    `${process.env.FILTER_CONFIG_SERVICE_URL}/${ctx.params.id}`
  );
  ctx.body = data;
  next();
};

const createConfig = async (ctx, next) => {
  const createData = ctx.request.body;
  const { data } = await axios.post(
    process.env.FILTER_CONFIG_SERVICE_URL,
    createData
  );
  ctx.body = data;
  ctx.response.status = 201;
  next();
};

const updateConfig = async (ctx, next) => {
  const updateData = ctx.request.body;
  const { data } = await axios.patch(
    `${process.env.FILTER_CONFIG_SERVICE_URL}/${ctx.params.id}`,
    updateData
  );
  ctx.body = data;
  next();
};

const destroyConfig = async (ctx, next) => {
  await axios.delete(
    `${process.env.FILTER_CONFIG_SERVICE_URL}/${ctx.params.id}`
  );
  ctx.body = { msg: "ok" };
  next();
};

module.exports = {
  getConfigs,
  getConfig,
  updateConfig,
  createConfig,
  destroyConfig
};
