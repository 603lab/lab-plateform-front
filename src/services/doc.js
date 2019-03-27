import request from '@/utils/request';
// import { stringify } from 'qs';

/**
 * 获取文档左侧导航栏
 * @param {number} -
 */
export async function getDocMenu() {
  return request(`/api/doc/menu`);
}
