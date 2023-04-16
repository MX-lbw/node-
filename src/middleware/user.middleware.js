const bcrypt = require("bcrypt");
const svgCaptcha = require("svg-captcha");
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExitedError,
  userRegisterError,
  userDoesNotExistError,
  userLoginError,
  userInvalidError,
  imgVerifyCodeError,
} = require("../consitant/err.type");
//验证参数合法性
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  //检验参数合法性
  if (!user_name || !password) {
    ctx.app.emit("error", userFormatError, ctx);
    return false;
  }
  await next();
};
//验证用户是否存在
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  //合理性 检查用户是否存在
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      ctx.app.emit("error", userAlreadyExitedError, ctx);
      return false;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
    return false;
  }
  await next();
};
//生成svg验证码
const captchaSvg = async (ctx, next) => {
  let captcha = svgCaptcha.createMathExpr({
    //  size: 6, // 验证码长度
    ignoreChars: "0o1i", // 验证码字符中排除 0o1i
    noise: 1,
    height: 40,
    color: false,
  });
  ctx.session.captcha = captcha.text.toLocaleLowerCase();

  ctx.success({ url: captcha.data }, "获取成功", 200);
};
//登录验证图片验证码
const verifyImgcode = async (ctx, next) => {
  const { verificationCode } = ctx.request.body;
  if (verificationCode && verificationCode === ctx.session.captcha) {
    await next();
  } else {
    return ctx.fail("验证码错误", 200);
  }
};
//密码加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const saltRounds = 10;
  //密文
  const hash = await bcrypt.hash(password, saltRounds);
  //加密后的密码保存在body中
  ctx.request.body.password = hash;
  await next();
};
//验证登录
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });
    //判断用户是否存在
    if (!res) {
      return ctx.app.emit("error", userDoesNotExistError, ctx);
    }
    //密码是否匹配 (不匹配error)
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", userInvalidError, ctx);
    }
  } catch (error) {
    return ctx.app.emit("error", userLoginError, ctx);
  }
  //login
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
  captchaSvg,
  verifyImgcode,
};
