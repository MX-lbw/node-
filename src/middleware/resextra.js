// 添加统一的返回结果方法
module.exports = function routerResponse() {
  return async function (ctx, next) {
    ctx.success = function (data, msg, code) {
      ctx.type = "json";
      ctx.body = {
        data: data,
        meta: {
          msg: msg || "success",
          status: code || 200,
        },
      };
    };
    ctx.fail = function (message, code) {
      ctx.type = "json";
      ctx.body = {
        data: null,
        meta: {
          msg: message || "fail",
          status: code || 500,
        },
      };
    };
    await next();
  };
};
