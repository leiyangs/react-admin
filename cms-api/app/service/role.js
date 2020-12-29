'use strict';

const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }

  // 重写select 把每个角色的权限返回 用来渲染tree的选中
  async select(pageNum, pageSize, where) {
    // 模糊查询
    let whereString = '';
    const fields = Object.keys(where);
    for (let i = 0; i < fields.length; i++) {
      whereString += (`AND ${fields[i]} like '%${where[fields[i]]}%'`);
    }

    // 写死条件1=1 可以不用判断什么时候拼接AND
    const listSql = `SELECT * FROM ${this.entity} WHERE 1=1 ${whereString} ORDER BY id DESC limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
    const list = await this.app.mysql.query(listSql);

    for (let i = 0; i < list.length; i++) {
      let role = list[i];
      // 角色下的权限
      let role_resources = await this.app.mysql.select('role_resource', {role_id: role.id});
      let resourceIds = role_resources.map(role_resource => role_resource.resource_id);
      role.resourceIds = resourceIds;

      // 人的角色
      let role_users = await this.app.mysql.select('role_user', {role_id: role.id});
      let userIds = role_users.map(role_user => role_user.user_id);
      role.userIds = userIds;
    }

    // 模糊匹配的total
    const totalSql = `SELECT COUNT(*) total FROM ${this.entity} WHERE 1=1 ${whereString}`;
    let total = await this.app.mysql.query(totalSql);
    total = total[0].total;
    return { list, total };
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
