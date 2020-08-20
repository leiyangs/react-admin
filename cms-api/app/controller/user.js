'use strict';

const BaseController = require('./base');
// 继承基类的方法,也就是说每个子类都会有增删改查的方法
class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
}

module.exports = UserController;
