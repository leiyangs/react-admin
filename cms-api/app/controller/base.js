'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(data) {
    this.ctx.body = {
      code: 1,
      data,
    };
  }

  // 支持分页
  async index() {
    const { service, ctx } = this;
    const { pageNum, pageSize, ...where } = ctx.query;
    const currentPageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    const currentPageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
    const result = await service[this.entity].select(currentPageNum, currentPageSize, where);
    this.success(result);
  }

  async create() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    const result = await service[this.entity].create(user);
    result > 0 ? this.success('添加成功') : this.error('添加失败');
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const user = ctx.request.body;
    user.id = id;
    const result = await service[this.entity].update(user);
    result > 0 ? this.success('更新成功') : this.error('更新失败');
  }
  
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    let ids = ctx.request.body;
    
    if(!Array.isArray(ids)) {
      ids = [id];
    }
    console.log('id',id,'ids',ids)
    const result = await service[this.entity].destroy(ids); // 兼容批量删除
    result > 0 ? this.success('删除成功') : this.error('删除失败');
  }
}

module.exports = BaseController;
