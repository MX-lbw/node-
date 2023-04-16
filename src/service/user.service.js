const User = require("../model/user.model");
//操作数据库
//调用Service层加上try catch
class UserService {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res;
  }
  //查詢用戶
  async getUserInfo({ id, user_name, password, id_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    id_admin && Object.assign(whereOpt, { id_admin });
    //查询语句
    const result = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });
    return result ? result.dataValues : null;
  }
  //更新用户数据
  async updateById({ id, user_name, password, id_admin }) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    id_admin && Object.assign(newUser, { id_admin });
    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0 ? true : false;
  }
}
module.exports = new UserService();
