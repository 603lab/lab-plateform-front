import request from '@/utils/request';
import { stringify } from 'qs';

/**
 * 获取待办工作
 * @param {number} isDone 枚举值?
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 */
export async function getCommisionWork(params) {
  return request(`/api/home/GetTasks?${stringify(params)}`);
}
