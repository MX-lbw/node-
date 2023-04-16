const Koa = require("koa");
//处理跨域
const cors = require("@koa/cors");
//解析客户端请求
const { koaBody } = require("koa-body");
//加载Session Key
const session = require("koa-session");
const sessionConfig = require("../config/session.default");
const { SESSION_SIGNED_KEY } = require("../config/config.default");
//限流插件
const ratelimits = require("../plugin/ratelimit");
//统一处理接口响应数据
const routerResponse = require("../middleware/resextra");
const errHandler = require("../app/errHandler");
//加载用户路由
const userRouter = require("../router/user.router");

const app = new Koa();

//使用限流
app.use(ratelimits());

//ctx response
app.use(routerResponse());
//请求解析
app.use(koaBody());
//跨域
app.use(cors({ maxAge: 10, credentials: true }));

//session
app.keys = [SESSION_SIGNED_KEY];

app.use(session(sessionConfig, app));
//用户路由
app.use(userRouter.routes());

//统一错误处理
app.on("error", errHandler);

module.exports = app;
