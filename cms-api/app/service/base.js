'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  async create(entity) {
    // return await this.app.mysql.query('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    // console.log('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    const result = await this.app.mysql.insert(this.entity, entity);
    const effectedRow = result.effectedRow;
    return effectedRow;
  }
  async select() {
    // return await this.app.mysql.query('select * from user');
    return await this.app.mysql.select(this.entity);
  }
  async update(entity) {
    const result = await this.app.mysql.update(this.entity, entity);
    const effectedRow = result.effectedRow;
    return effectedRow; // 如果在数据库影响行数大于0 那么成功，如果小于0就是失败
  }
  async destroy(id) {
    const result = await this.app.mysql.delete(this.entity, { id });
    const effectedRow = result.effectedRow;
    return effectedRow;
  }
}

module.exports = BaseService;
