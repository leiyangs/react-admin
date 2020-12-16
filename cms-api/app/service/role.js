'use strict';

const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  /**
   * 角色
   */
  async getUser() {
    return await this.app.mysql.select('user');
  }

  async setUser(body) {
    const { app } = this;
    const { roleId, userIds } = body;
    // 设置事务，不成功就回滚
    const conn = await app.mysql.beginTransaction();
    let result = true;
    try {
      // 全删全加
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
  /**
   * 资源
   */
  async getResource() {
    // 以下数据格式根据parent_id处理平行结构为树形结构
    // [{"id": 1,"name": "平台管理","parent_id": 0},{"id": 2,"name": "角色管理","parent_id": 1},{"id": 3,"name": "用户管理","parent_id": 1},{"id": 4,"name": "添加角色","parent_id": 2},{"id": 5,"name": "添加用户","parent_id": 3}]
    const list = await this.app.mysql.select('resource');
    const rootMenus = [];
    const resourceMap = {};
    list.forEach(item => {
      item.children = [];
      resourceMap[item.id] = item;
      if (item.parent_id === 0) {
        rootMenus.push(item);
      } else {
        // 改变的是item，所以rootMenus中item的children也会改变
        resourceMap[item.parent_id] && resourceMap[item.parent_id].children.push(item);
      }
    });
    return rootMenus;
  }
  
  async setResource(body) {
    const { app } = this;
    const { roleId, resourceIds } = body;
    // 设置事务，不成功就回滚
    const conn = await app.mysql.beginTransaction();
    let result = true;
    try {
      await conn.query('DELETE FROM role_resource WHERE role_id = ?', [ roleId ]);
      for (let i = 0; i < resourceIds.length; i++) {
        await conn.insert('role_resource', { role_id: roleId, resource_id: resourceIds[i] });
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
