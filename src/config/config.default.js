//全局配置
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../../.env") }); // {path:""}
module.exports = process.env;
