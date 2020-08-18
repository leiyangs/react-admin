/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1597755939854_6253';

  config.middleware = [];

  const userConfig = {
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
