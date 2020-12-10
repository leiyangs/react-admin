import request from '@/utils/request';

// get方式只能把参数拼接到url地址中进行传递
export function getUserList(data) {
  return request(`/api/user?pageNum=${data.pageNum}&pageSize=${data.pageSize}`);
}