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
 * 新建 POST
 * @param {string} parentId 父级ID required
 * @param {string} fileAddress 文章路径 required
 * @param {string} fileName 文章名字 required
 * @param {string} fileTag 文章标签 required
 * @param {string} content 文章内容 required
 * @param {string} type 文章类型 required
 * @param {string} remark
 * @param {string} createUserCode 创建者ID required
 * @param {string} createUserName 创建者姓名 required
 */
export async function createArticle(params) {
  return request(`/api/${basePrefix}/AddDoc`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 收藏文章 POST
 * @param {numbner} isCollect 收藏标识 required 1 收藏/ 0 取消收藏
 * @param {number} itemId 文章编号 required
 * @param {string} createUserCode 创建者ID required
 * @param {string} createUserName 创建者姓名 required
 */
export async function collectArticle(params) {
  return request(`/api/${basePrefix}/Collect`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
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
