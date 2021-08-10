'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');

class IndexController extends BaseController {
  async captcha() { // 获取验证码
    const { ctx } = this;
    const options = {// 参数
      width: 180,
      height: 32,
      fontSize: 50,
      color: true,
      noise: 2,
    };
    const captcha = svgCaptcha.create(options);
    // egg内置了session插件，直接ctx.session
    ctx.session.captcha = captcha.text;
    console.log(captcha.text, ctx.session.captcha)
    ctx.set('Content-type', 'image/svg+xml');
    ctx.body = captcha.data;
  }

  async checkCaptcha() { // 校验验证码
    const { ctx } = this;
    const { captcha } = ctx.request.body;
    if (ctx.session.captcha === captcha) {
      ctx.body = { code: 0, data: '验证成功' }
    } else {
      ctx.body = { code: 1, data: '验证码不正确' }
    }
  }
}

module.exports = IndexController;
