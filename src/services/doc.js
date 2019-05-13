import request from '@/utils/request';
import { stringify } from 'qs';

const basePrefix = 'Base-Module/Encyclopedia';

/**
 * 获取文档左侧导航栏
 */
export async function getDocMenu() {
  return request(`/api/${basePrefix}/GetMenu`);
}
/**
 * 百科文章搜索
 * @param {string}
 * @param {string}
 * @param {string}
 */
export async function searchArticle(params) {
  return request(`/api/${basePrefix}/Search?${stringify(params)}`);
}

/**
 * 百科文章详情 GET
 * @param {numbner} id 文章ID required
 * @param {string} createUserCode 文章创建者 required
 */
export async function getDocDetail(params) {
  return request(`/api/${basePrefix}/GetDocConetnt?${stringify(params)}`);
}

/**
 * 获取文章评论 GET
 * @param {numbner} docId 文章ID required
 * @param {string} createUserCode 创建者ID required
 * @param {string} createUserName 创建者姓名 required
 */
export async function fetchComments(params) {
  return request(`/api/${basePrefix}/GetComments?${stringify(params)}`);
}

/**
 * 发表评论或者回复 POST
 * @param {numbner} docId 文章ID required
 * @param {string} createUserCode 创建者ID required
 * @param {string} createUserName 创建者姓名 required
 * @param {number} isReply 评论还是回复 required  0 评论 1 回复
 * @param {number} parentCode 回复的父级id
 * @param {number} replyUserCode 回复者ID
 * @param {number} replyUserName 回复者姓名
 *
 */
export async function addComment(params) {
  return request(`/api/${basePrefix}/AddComments`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
