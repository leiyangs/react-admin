import fetch from 'dva/fetch';
const BASE_URL = 'hppt://10.10.18.150:7001';

export default function request(url, options={}) {
  url = BASE_URL + url;
  options.headers = options.headers || {};
  options.headers['Content-Type'] = 'application/json';
  options.headers['Accept'] = 'application/json';
  options.method = options.method || 'get';
  options.credentials = 'include'; // 跨域时候传递cookie 配合服务端使用
  return fetch(url, options).then(res => res.json());
}