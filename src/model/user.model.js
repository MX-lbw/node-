const { DataTypes } = require("sequelize");
const seq = require("../db/reqConnect");
//用户表模型
const User = seq.define(
  //模型名称
  "dt_user",
  {
    //模型属性---->字段
    phone: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      unique: true,
      comment: "手机号",
    },
    user_name: {
      type: DataTypes.STRING, //字符类型
      allowNull: false, //是否为空
      unique: true, //是否唯一
      comment: "用户名", //自动描述
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "用户密码",
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, //默认值
      comment: "0:false 1:true",
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //1-3-5
      defaultValue: 1,
      comment: "难度系数",
    },
  },
  {
    tableName: "dt_users",
  }
);
//强制模型同步  创建数据表
//User.sync({ force: true });
User.sync(); // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
module.exports = User;
