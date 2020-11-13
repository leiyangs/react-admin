'use strict';

const BaseController = require('./base');
// 继承基类的方法,也就是说每个子类都会有增删改查的方法
class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  async signup() {
    const { ctx, app } = this;
    const body = ctx.request.body; // 注册传入的数据
    let { repassword, address, agreement, ...user } = body;
    if (repassword !== user.password) {
      this.error('密码与确认密码不一致');
    }
    if (!agreement) {
      this.error('请同意协议后再试');
    }
    address = address.join('-');
    user.address = address;
    const result = await app.mysql.insert('user', user);
    if (result.affectedRows > 0) {
      this.success('注册成功')
    }else {
      this.error('注册失败')
    }
  }
}

module.exports = UserController;
