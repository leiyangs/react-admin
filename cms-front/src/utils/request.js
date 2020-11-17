// import fetch from 'dva/fetch'; // 这种引入方式下个版本会删除
const fetch = require('dva').fetch;
const BASE_URL = 'http://127.0.0.1:7001';

export default function request(url, options={}) {
  url = BASE_URL + url;
  options.headers = options.headers || {};
  // 如果有token，就把token通过请求头中的authorization发给服务端进行权限验证
  const token = localStorage.getItem('token');
  if(token) {
    options.headers.authorization = token;
  }
  options.headers['Content-Type'] = 'application/json';
  options.headers['Accept'] = 'application/json';
  options.method = options.method || 'get';
  options.credentials = 'include'; // 跨域时候传递cookie 配合服务端使用
  return fetch(url, options).then(res => res.json());
}