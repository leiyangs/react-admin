import request from '@/utils/request';
import qs from 'querystring';

const ENTITY = 'resource';

// get方式只能把参数拼接到url地址中进行传递
export function getResourceList(data) {
  // qs处理参数为query格式
  const dataString = qs.stringify(data);
  // return request(`/api/user?pageNum=${data.pageNum}&pageSize=${data.pageSize}`);
  return request(`/api/${ENTITY}?${dataString}`);
}

export function createResource(data) {
  return request(`/api/${ENTITY}/`, {
    method: 'post',
    body: JSON.stringify(data)
  })
}

export function updateResource(data) {
  return request(`/api/${ENTITY}/${data.id}`, {
    method: 'put',
    body: JSON.stringify(data)
  })
}

export function deleteResource(id) {
  return request(`/api/${ENTITY}/${id}`, {
    method: 'delete'
  })
}

export function multiDeleteResource(ids) {
  return request(`/api/${ENTITY}/${ids[0]}`, {
    method: 'delete',
    body: JSON.stringify(ids)
  })
}
