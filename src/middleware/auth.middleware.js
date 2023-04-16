const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const {
  tokenExpiredError,
  jsonWebTokenError,
} = require("../consitant/err.type");
//验证token
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.userInfo = decoded;
  } catch (error) {
    switch (error.name) {
      //token过期
      case "TokenExpiredError":
        return ctx.app.emit("error", tokenExpiredError, ctx);
        break;
      case "JsonWebTokenError":
        return ctx.app.emit("error", jsonWebTokenError, ctx);
        break;
    }
  }
  await next();
};

module.exports = {
  auth,
};
