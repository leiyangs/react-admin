'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async index() {
    const { ctx, service } = this;
    const result = await service[this.entity].select();
    ctx.body = { code: 0, data: result, message: 'success' };
  }
  async create() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    await service[this.entity].create(user);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const user = ctx.request.body;
    user.id = id;
    await service[this.entity].update(user);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    await service[this.entity].destroy(id);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
}

module.exports = BaseController;
