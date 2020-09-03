'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  // 获取用户角色
  async getUser() {
    const { service } = this;
    const result = await service[this.entity].getUser();
    this.success(result);
  }
  // 设置角色和用户的关联 role_user
  async setUser() {
    const { ctx, service } = this;
    const body = ctx.request.body;// {roleId,userIds}
    const result = await service[this.entity].setUser(body);
    result ? this.success('为角色设置用户成功') : this.success('为角色设置用户失败');
  }
  // 获取角色资源
  async getResource() {
    const { service } = this;
    const result = await service.role.getResource();
    this.success(result);
  }
  // 设置资源和用户的关系
  async setResource() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const result = await service.role.setResource(body);
    result ? this.success('为角色设置资源成功') : this.success('为角色设置资源失败');
  }
}

module.exports = RoleController;
