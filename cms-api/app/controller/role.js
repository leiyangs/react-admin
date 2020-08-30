'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async getUser() {
    const { service } = this;
    const result = await service.role.getUser();
    this.success(result);
  }
}

module.exports = RoleController;
