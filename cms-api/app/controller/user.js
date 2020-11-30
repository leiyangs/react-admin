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
    let { repassword, address, agreement, prefix, captcha, ...user } = body;
    console.log(captcha, ctx.session.captcha);
    if (repassword !== user.password) {
      return this.error('密码与确认密码不一致');
    }
    if (!agreement) {
      return this.error('请同意协议后再试');
    }
    if (!captcha || !ctx.session.captcha || captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
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
    console.log(captcha, ctx.session.captcha) ;
    // 校验验证码是否正确
    // if (!captcha || !ctx.session.captcha || captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    //   return this.error('验证码不正确');
    // }

    // mysql.select写法
    // const result = await app.mysql.select('user', { where: { username, password },
    //   limit: 1,
    //   offset: 0,
    // });

    const result = await app.mysql.get('user', { password, username }); // egg中mysql的方法，查不到会返回null，查到返回本条数据
    if (result) {
      // 获取到用户信息后，把用户菜单权限一并返回
      const resources = await app.mysql.query(`SELECT resource.* FROM role_user INNER JOIN role_resource ON role_user.role_id = role_resource.role_id INNER JOIN resource ON role_resource.resource_id = resource.id WHERE role_user.user_id = ?`, [result.id]);
      // 将菜单权限改为树形结构
      let menus = [];
      let resourceMap = {};
      resources.forEach(resource => {
        resource.children = [];
        resourceMap[resource.id] = resource;
        if(resource.parent_id == 0) {
          menus.push(resource);
        }else {
          resourceMap[resource.parent_id] && resourceMap[resource.parent_id].children.push(resource);
        }
      })

      // mysql返回的result不是纯对象，jwt sign签名只能使用纯对象
      const user = JSON.parse(JSON.stringify(result));
      user.menus = menus;
      console.log(user);
      const token = sign(user, config.JWT_SECRET); // 生成token，加盐 config.default.js
      this.success(token);
    } else {
      this.error('登录失败');
    }
  }
}

module.exports = UserController;
