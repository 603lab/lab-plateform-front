/*
 * @Author: chenxiaobin
 * @Date: 2019-03-27 16:32:35
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-27 16:45:14
 * tips: 接口参数需罗列清楚
 */

import request from '@/utils/request';
import { stringify } from 'qs';

const baseUrl = 'Base-Module/Users';
export async function queryList(params) {
  return request(`/api/${baseUrl}/GetMyDocs?${stringify(params)}`);
}

/**
 * 获取个人信息
 * @param {number} isCollect	收藏标识  required	1 收藏/ 0 取消收藏
 * @param {number} itemId	    文章编号	required
 * @param {string} createUserCode	 	当前用户编号	required
 * @param {string} itecreateUserNamemId	 	当前用户姓名	required
 */
export async function queryCurrent(params) {
  return request(`/api/${baseUrl}/GetUsersInfo?${stringify(params)}`);
}

/**
 * 获取个人标签
 * @param {string} createUserCode	当前用户编号	required
 */
export async function queryTags(params) {
  return request(`/api/${baseUrl}/GetTags?${stringify(params)}`);
}

/**
 * 添加标签
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} createUserName	 	当前用户名	required
 * @param {string} label	标签名	required
 */
export async function addTag(params) {
  return request(`/api/${baseUrl}/AddTag`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 添加标签
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} createUserName	 	当前用户名	required
 * @param {string} label	标签名	required
 */
export async function deleteTag(params) {
  return request(`/api/${baseUrl}/DeleteTag`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 获取用户技能
 * @param {string} createUserCode	当前用户编号	required
 */
export async function querySkills(params) {
  return request(`/api/${baseUrl}/GetSkills?${stringify(params)}`);
}
