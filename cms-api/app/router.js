'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();
  router.get('/', auth, controller.home.index); // 在router中执行中间件
  // CRUD写法，包含增删改查
  // resources这种写法一行代替多行 相当于分开写合起来 router.get('/api/user', controller.user.index); router.post('/api/user', controller.user.create);
  router.resources('user', '/api/user', controller.user);
  router.resources('reource', '/api/reource', controller.reource);
  router.resources('role', '/api/role', controller.role);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);

  // 获取所有用户
  router.get('/api/role/getUser', controller.role.getUser);
  // 设置用户与角色的关系
  router.post('/api/role/setUser', controller.role.setUser);
  // 获取所有资源
  router.get('/api/role/getResource', controller.role.getResource);
  // 设置角色与资源的关系
  router.post('/api/role/setResource', controller.role.setResource);
  // 验证码
  router.get('/api/captcha', controller.index.captcha);
  // 校验验证码
  router.post('/api/checkCaptcha', controller.index.checkCaptcha);
  // 注册
  router.post('/api/signup', controller.user.signup);
  // 登录
  router.post('/api/signin', controller.user.signin);
};
