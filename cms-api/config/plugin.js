'use strict';

// egg的操作数据库插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// 允许跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors'
}