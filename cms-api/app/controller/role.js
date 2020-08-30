'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
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
}

module.exports = RoleController;
