import request from '@/utils/request';
import qs from 'querystring';

const ENTITY = 'role';

// get方式只能把参数拼接到url地址中进行传递
export function getRoleList(data) {
  // qs处理参数为query格式
  const dataString = qs.stringify(data);
  // return request(`/api/user?pageNum=${data.pageNum}&pageSize=${data.pageSize}`);
  return request(`/api/${ENTITY}?${dataString}`);
}

export function createRole(data) {
  return request(`/api/${ENTITY}/`, {
    method: 'post',
    body: JSON.stringify(data)
  })
}

export function updateRole(data) {
  return request(`/api/${ENTITY}/${data.id}`, {
    method: 'put',
    body: JSON.stringify(data)
  })
}

export function deleteRole(id) {
  return request(`/api/${ENTITY}/${id}`, {
    method: 'delete'
  })
}

export function multiDeleteRole(ids) {
  return request(`/api/${ENTITY}/${ids[0]}`, {
    method: 'delete',
    body: JSON.stringify(ids)
  })
}

export function getResources() {
  return request(`/api/${ENTITY}/getResource`)
}

export function setRolePermission(data) {
  return request(`/api/${ENTITY}/setResource`, {
    method: 'post',
    body: JSON.stringify(data)
  })
}
