'use strict';

const BaseController = require('./base');
const { sign } = require('jsonwebtoken'); // 引入签名方法
// 继承基类的方法,也就是说每个子类都会有增删改查的方法
class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  async signup() {
    const { ctx, app } = this;
    const body = ctx.request.body; // 注册传入的数据
    let { repassword, address, agreement, prefix, ...user, captcha } = body;
    if (repassword !== user.password) {
      return this.error('密码与确认密码不一致');
    }
    if (!agreement) {
      return this.error('请同意协议后再试');
    }
    if(!captcha || !ctx.session.captcha || captcha !== ctx.session.captcha ) {
      return this.error('验证码不正确');
    }
    // 处理地址
    address = address.join('-');
    user.address = address;
    // 处理电话 区号+电话
    user.phone = `${prefix}-${user.phone}`;
    const result = await app.mysql.insert('user', user);
    if (result.affectedRows > 0) {
      this.success('注册成功');
    } else {
      this.error('注册失败');
    }
  }
  async signin() {
    const { ctx, app, config } = this;
    const { password, username, captcha } = ctx.request.body;
    if(!captcha || !ctx.session.captcha || captcha !== ctx.session.captcha ) {
      return this.error('验证码不正确');
    }
    const result = await app.mysql.get('user', { password, username }); // egg中mysql的方法，查不到会返回null，查到返回本条数据
    if (result) {
      // mysql返回的result不是纯对象，jwt sign签名只能使用纯对象
      const user = JSON.parse(JSON.stringify(result));
      const token = sign(user, config.JWT_SECRET); // 生成token，加盐
      this.success(token);
    } else {
      this.error('登录失败');
    }
  }
}

module.exports = UserController;
