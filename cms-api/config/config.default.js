/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {
  const config = exports = {}; // 公共配置

  config.keys = appInfo.name + '_1597755939854_6253';

  config.middleware = [];

  const userConfig = {
    security: { // 安全
      csrf: false,
      domainWhiteList: ['*'], // egg-cors跨域白名单  Access-Control-Allow-Origin
    },
    cors: {
      credentials: true, // egg-cors允许传递cookie
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'cms',
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
