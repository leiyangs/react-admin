import request from '../../../utils/request';
// 注册功能
export function signup(data) {
  return request('/api/signup', {
    method: 'post',
    body: data
  })
}
// 登陆
export function signin(data) {
  return request('/api/signin', {
    method: 'post',
    body: data
  })
}