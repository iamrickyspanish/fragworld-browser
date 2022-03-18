const axios = require("axios");

const login = async (ctx, next) => {
  const { credentials } = ctx.request.body;
  const { email, password } = credentials;
  const user = await axios.post(`${process.env.USERS_SERVICE_URL}/auth`, {
    email,
    password
  });
  if (!user) ctx.throwError(403, "piss off");
  ctx.session.logged = true;
  ctx.body = user;
  next();
};

const logout = async (ctx, next) => {
  ctx.session.logged = false;
  ctx.body = { msg: "ok" };
  next();
};

module.exports = {
  login,
  logout
};
