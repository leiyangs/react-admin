'use strict';

const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async getUser() {
    return await this.app.mysql.select(this.entity);
  }
  async setUser(body) {
    const { app } = this;
    const { roleId, userIds } = body;
    // 设置事务，不成功就回滚
    const conn = await app.mysql.beginTransaction();
    let result = true;
    console.log(roleId, userIds, 'ids');
    try {
      await conn.query('DELETE FROM role_user WHERE role_id = ?', [ roleId ]);
      for (let i = 0; i < userIds.length; i++) {
        await conn.insert('role_user', { role_id: roleId, user_id: userIds[i] });
      }
      await conn.commit();
    } catch (error) {
      console.log(error, 'err');
      await conn.rollback();
      result = false;
    }
    return result;
  }
}

module.exports = RoleService;
