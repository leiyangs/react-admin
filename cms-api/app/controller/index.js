'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({});
    // egg内置了session插件，直接ctx.session
    ctx.session.captcha = captcha.text;
    ctx.set('Content-type', 'image/svg+xml');
    ctx.body = captcha.data;
  }
  async checkCaptcha() {
    const { ctx } = this;
    const { captcha } = ctx.request.body;
    if(ctx.session.captcha === captcha) {
      ctx.body = { code: 0, data: '验证成功' }
    }else {
      ctx.body = { code: 1, data: '验证码不正确' }
    }
  }
}

module.exports = IndexController;
