import request from '@/utils/request';
import { stringify } from 'qs';
import Store from '@/utils/store';

/**
 * 获取待办工作
 * @param {number} isDone 枚举值?
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 * @param {string} createUserCode	用户编号	required
 */
export async function getCommisionWork(params) {
  const { createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
  };
  return request(`/api/Base-Module/Home/GetTasks?${stringify(p)}`);
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
 * 推荐大佬
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 * @param {String} leaderType	推荐大佬类型	required
 * @param {number} uCode	当前用户编号	required
 */

export async function getUsers(params) {
  const { uCode } = Store.getBasicInfo();
  const p = {
    ...params,
    uCode,
  };
  return request(`/api/Base-Module/Home/GetLeaders?${stringify(p)}`);
}

/**
 * 推荐文章
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 * @param {String} articleType	推荐文章类型	required
 */

export async function getArticles(params) {
  return request(`/api/Base-Module/Home/GetGoods?${stringify(params)}`);
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
  const { createUserName, createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
    createUserName,
    receivedUserName: createUserName,
    receivedUserCode: createUserCode,
  };
  return request(`/api/Base-Module/Home/AddTask`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}

/**
 * 编辑任务
 * @param {number} ID	任务编号	required
 * @param {string} taskTitle	任务标题	required
 * @param {datetime} endTime	截止时间	required
 * @param {string} taskDescription	任务描述	required
 * @param {string} receivedUserName	接收者姓名	required
 * @param {string} receivedUserCode	接收者编号	required
 * @param {number} isDone	是否完成	required
 * @param {string} createUserName	创建人姓名	required
 * @param {string} createUserCode	创建人编号	required
 */

export async function editTask(params) {
  const { createUserName, createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
    createUserName,
    receivedUserName: createUserName,
    receivedUserCode: createUserCode,
  };
  return request(`/api/Base-Module/Home/UpdateTask`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}

/**
 * 关注和取消关注用户
 * @param {number} isFollow	是否关注	required
 * @param {string} followUserCode	关注人编号	required
 * @param {string} followUserName	关注人姓名	required
 * @param {string} createUserName	创建人姓名	required
 * @param {string} createUserCode	创建人编号	required
 */

export async function followUser(params) {
  const { createUserName, createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
    createUserName,
  };
  return request(`/api/Base-Module/Encyclopedia/Follow`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}
