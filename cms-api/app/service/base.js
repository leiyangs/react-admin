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
    // 精确查询
    /* const list = await this.app.mysql.select(this.entity, {
      where,
      columns: [ 'id', 'username', 'gender', 'phone', 'address', 'email', 'website', 'birthday', 'password' ], // 要查询的表字段
      orders: [[ 'id', 'desc' ]], // 排序方式
      offset: (pageNum - 1) * pageSize, // 偏移量，计算前面有几条
      limit: pageSize, // 返回数据量
    });
 */

    // 模糊查询
    let whereString = '';
    const fields = Object.keys(where);
    for (let i = 0; i < fields.length; i++) {
      whereString += (`AND ${fields[i]} like '%${where[fields[i]]}%'`);
    }

    // 写死条件1=1 可以不用判断什么时候拼接AND
    const listSql = `SELECT * FROM user WHERE 1=1 ${whereString} ORDER BY id DESC limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
    const list = await this.app.mysql.query(listSql);

    // const total = await this.app.mysql.count(this.entity, where); // 查询条件下的总条数
    // 模糊匹配的total
    const totalSql = `SELECT COUNT(*) total FROM user WHERE 1=1 ${whereString}`;
    let total = await this.app.mysql.query(totalSql);
    total = total[0].total;
    return { list, total };
  }

  async update(entity) {
    const result = await this.app.mysql.update(this.entity, entity);
    const affectedRows = result.affectedRows;
    console.log(result);
    return affectedRows; // 如果在数据库影响行数大于0 那么成功，如果等于于0就是失败
  }
  
  async destroy(ids) {
    const result = await this.app.mysql.delete(this.entity, { id: ids }); // { id } => { id: ids } 兼容多个删除
    const affectedRows = result.affectedRows;
    return affectedRows;
  }
}

module.exports = BaseService;
