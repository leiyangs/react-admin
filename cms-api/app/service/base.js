'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  async create(entity) {
    // return await this.app.mysql.query('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    // console.log('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + entity.username + ',' + entity.password + ',' + entity.email + ',' + entity.phone + ',' + entity.gender + ');');
    const result = await this.app.mysql.insert(this.entity, entity);
    const affectedRows = result.affectedRows;
    return affectedRows;
  }
  async select(pageNum, pageSize, where) {
    // const list =  await this.app.mysql.query('SELECT * FROM user ORDER BY id asc limit 2,3');
    const list = await this.app.mysql.select(this.entity, {
      where,
      orders: [[ 'id', 'asc' ]],
      offset: (pageNum - 1) * pageSize, // 偏移量，计算前面有几条
      limit: pageSize,
    });
    const total = await this.app.mysql.count(this.entity, where); // 查询条件下的总条数
    return { list, total };
  }
  async update(entity) {
    const result = await this.app.mysql.update(this.entity, entity);
    const affectedRows = result.affectedRows;
    console.log(result);
    return affectedRows; // 如果在数据库影响行数大于0 那么成功，如果等于于0就是失败
  }
  async destroy(id) {
    const result = await this.app.mysql.delete(this.entity, { id });
    const affectedRows = result.affectedRows;
    return affectedRows;
  }
}

module.exports = BaseService;
