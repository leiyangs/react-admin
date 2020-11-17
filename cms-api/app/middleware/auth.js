'use strict';
const { verify } = require('jsonwebtoken');

// 封装验证token方法为promise
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports = function() {
  return async (ctx, next) => {
    const token = ctx.get('authorization');
    if (token) {
      try {
        const user = await verifyToken(token, this.config.JWT_SECRET);
        ctx.session.user = user; // 在controller中可以使用
        await next();
      } catch (err) {
        ctx.status = 403;
        ctx.body = {
          code: 1,
          data: 'token不存在',
        };
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        code: 1,
        data: 'token不存在',
      };
    }
  };
};
