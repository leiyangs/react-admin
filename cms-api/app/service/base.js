'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  async create(entity) {
    // return await this.app.mysql.query('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    // console.log('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    return await this.app.mysql.insert(this.entity, entity);
  }
  async select() {
    // return await this.app.mysql.query('select * from user');
    return await this.app.mysql.select(this.entity);
  }
  async update(entity) {
    return await this.app.mysql.update(this.entity, entity);
  }
  async destroy(id) {
    return await this.app.mysql.delete(this.entity, { id });
  }
}

module.exports = BaseService;
