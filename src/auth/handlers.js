const axios = require("axios");

const login = async (ctx, next) => {
  const { credentials } = ctx.request.body;
  const { email, password } = credentials;
  try {
    const { data: user } = await axios.post(
      `${process.env.USERS_SERVICE_URL}/auth`,
      {
        email,
        password
      }
    );
    ctx.session.logged = true;
    ctx.body = user;
    next();
  } catch (e) {
    ctx.throw(401, "piss off");
  }
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
