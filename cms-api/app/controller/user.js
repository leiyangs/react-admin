'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    const result = await service.user.select();
    ctx.body = { code: 0, data: result, message: 'success' };
  }
  async create() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    await service.user.create(user);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const user = ctx.request.body;
    user.id = id;
    await service.user.update(user);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    await service.user.destroy(id);
    ctx.body = { code: 0, data: '', message: 'success' };
  }
}

module.exports = UserController;
