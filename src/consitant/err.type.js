module.exports = {
  userFormatError: { code: 10001, message: "用户名或密码为空", result: "" },
  userAlreadyExitedError: {
    code: 10002,
    message: "用户已经存在",
    result: "",
  },
  userRegisterError: {
    code: 10003,
    message: "用户注册错误",
    result: "",
  },
  userDoesNotExistError: {
    code: 10004,
    message: "用户不存在",
    result: "",
  },
  userLoginError: {
    code: 10005,
    message: "用户登录失败",
    result: "",
  },
  userInvalidError: {
    code: 10006,
    message: "用户名或密码错误",
    result: "",
  },
  tokenExpiredError: {
    code: 10101,
    message: "token已过期",
    result: "",
  },
  jsonWebTokenError: {
    code: 10102,
    message: "无效的token",
    result: "",
  },
  changePasswordFailError: {
    code: 10007,
    message: "密码修改失败",
    result: "",
  },
};
