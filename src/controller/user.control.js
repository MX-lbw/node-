const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const {
  userRegisterError,
  userLoginError,
  changePasswordFailError,
} = require("../consitant/err.type");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
  async register(ctx, next) {
    //获取请求参数
    const { user_name, password } = ctx.request.body;
    //操作数据库
    try {
      const res = await createUser(user_name, password);
      //返回结果
      ctx.success({ id: res.id, username: res.user_name }, "注册成功", 200);
    } catch (error) {
      return ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      //获取用户信息 颁发token
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.session.token = jwt.sign(res, JWT_SECRET, { expiresIn: "1d" });
      ctx.success(
        {
          id: res.id,
          username: res.user_name,
          rid: res.is_admin,
          token: ctx.session.token,
        },
        "登录成功",
        200
      );
    } catch (error) {
      return ctx.app.emit("error", userLoginError, ctx);
    }
  }
  async changePassword(ctx, next) {
    //获取数据
    const id = ctx.state.userInfo.id;
    const { password } = ctx.request.body;
    //操作数据库
    //返回结果
    try {
      const res = await updateById({ id, password });
      if (res) {
        return ctx.success("修改密码成功", 0);
      }
    } catch (error) {
      return ctx.app.emit("error", changePasswordFailError, ctx);
    }
  }
}
module.exports = new UserController();
