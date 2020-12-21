import request from '@/utils/request';
import qs from 'querystring';

const ENTITY = 'role';

// get方式只能把参数拼接到url地址中进行传递
export function getUserList(data) {
  // qs处理参数为query格式
  const dataString = qs.stringify(data);
  // return request(`/api/user?pageNum=${data.pageNum}&pageSize=${data.pageSize}`);
  return request(`/api/${ENTITY}?${dataString}`);
}

export function createUser(data) {
  return request(`/api/${ENTITY}/`, {
    method: 'post',
    body: JSON.stringify(data)
  })
}

export function updateUser(data) {
  return request(`/api/${ENTITY}/${data.id}`, {
    method: 'put',
    body: JSON.stringify(data)
  })
}

export function deleteUser(id) {
  return request(`/api/${ENTITY}/${id}`, {
    method: 'delete'
  })
}

export function multiDeleteUser(ids) {
  return request(`/api/${ENTITY}/${ids[0]}`, {
    method: 'delete',
    body: JSON.stringify(ids)
  })
}
