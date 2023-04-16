//连接数据库
const { Sequelize } = require("sequelize");
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_BASE,
} = require("../config/config.default.js");
const seq = new Sequelize(DB_BASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  //取消sql语句输出到控制台
  logging: false,
  timezone: "+08:00", //处理时差
});
//连接测试
// try {
//   seq
//     .authenticate()
//     .then((result) => {
//       console.log("连接成功");
//     })
//     .catch((error) => {
//       throw new Error(error, "连接失败");
//     });
// } catch (error) {
//   console.log(error);
// }
module.exports = seq;
