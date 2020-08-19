'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    // return await this.app.mysql.query('INSERT INTO `user` (username,password,email,phone,gender) VALUES (' + user.username + ',' + user.password + ',' + user.email + ',' + user.phone + ',' + user.gender + ')');
    return await this.app.mysql.insert('user', user);
  }
  async select() {
    // return await this.app.mysql.query('select * from user');
    return await this.app.mysql.select('user');
  }
  async update(user) {
    return await this.app.mysql.update('user', user);
  }
  async destroy(id) {
    return await this.app.mysql.delete('user', { id });
  }
}

module.exports = UserService;
