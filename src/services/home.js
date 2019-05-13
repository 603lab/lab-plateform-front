import request from '@/utils/request';
import { stringify } from 'qs';

/**
 * 获取待办工作
 * @param {number} isDone 枚举值?
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 * @param {string} createUserCode	用户编号	required
 */
export async function getCommisionWork(params) {
  return request(`/api/Base-Module/Home/GetTasks?${stringify(params)}`);
}

/**
 * 获取最新公告
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 */

export async function getNotices(params) {
  return request(`/api/Base-Module/Home/GetNotices?${stringify(params)}`);
}

/**
 * 添加任务
 * @param {string} taskTitle	任务标题	required
 * @param {datetime} endTime	截止时间	required
 * @param {string} taskDescription	任务描述	required
 * @param {string} receivedUserName	接收者姓名	required
 * @param {string} receivedUserCode	接收者编号	required
 * @param {number} isDone	是否完成	required
 * @param {string} createUserName	创建人姓名	required
 * @param {string} createUserCode	创建人编号	required
 */

export async function addTask(params) {
  return request(`/api/Base-Module/Home/AddTask`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
