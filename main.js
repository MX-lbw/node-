//use .env defaultconfig
const { APP_PORT } = require("./src/config/config.default");
//koa 业务
const app = require("./src/app/index");

//http服务
app.listen(APP_PORT, () => {
  console.log(`serve start ${APP_PORT}`);
});
