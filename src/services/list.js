/*
 * @Author: chenxiaobin
 * @Date: 2019-03-21 15:53:08
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-07 17:41:04
 */
import request from '@/utils/request';
import { stringify } from 'qs';

/**
 * 获取我的文章
 * @param {string} uCode	当前用户学号	required
 * @param {number} currentPage	当前页数	required
 * @param {number} pageSize	每页数量	required
 * @param {string} content	文章关键字
 */

export async function queryList(params) {
  return request(`/api/Base-Module/Users/GetMyDocs?${stringify(params)}`);
}

/**
 * 点赞/取消文章
 * @param {string} isLike	文章当前状态  required  1: 点赞 0: 未点赞
 * @param {number} itemId	文章ID	required
 * @param {string} type	点赞类型	required  Comment: 文章评论点赞 Doc: doc类型的点赞
 * @param {string} createUserCode	用户学号	required
 * @param {string} createUserName	用户姓名  required
 */
export async function likeArticle(params) {
  return request(`/api/Base-Module/Encyclopedia/Like`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
