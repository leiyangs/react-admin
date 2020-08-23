'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 这种写法一行顶多行 相当于分开写合起来 router.get('/api/user', controller.user.index); router.post('/api/user', controller.user.create);
  router.resources('user', '/api/user', controller.user);
  router.resources('reource', '/api/reource', controller.reource);
  router.resources('role', '/api/role', controller.role);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);
};
