const Router = require("koa-router");
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
  captchaSvg,
  verifyImgcode,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");
const {
  register,
  login,
  changePassword,
} = require("../controller/user.control");
const userRouter = new Router({ prefix: "/users" });

//注册接口
userRouter.post(
  "/register",
  //验证参数合法性
  userValidator,
  //验证用户是否存在
  verifyUser,
  //加密
  cryptPassword,
  //写入
  register
);
//登录接口
userRouter.post("/login", userValidator, verifyLogin, verifyImgcode, login);
//put 修改所有信息    //patch 修改部分内容
//修改密码接口
userRouter.patch(
  "/cgpass",
  auth,
  cryptPassword,
  changePassword,
  (ctx, next) => {
    ctx.body = "修改成功";
  }
);
userRouter.get("/captcha", captchaSvg);
module.exports = userRouter;
