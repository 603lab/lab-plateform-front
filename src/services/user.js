/*
 * @Author: chenxiaobin
 * @Date: 2019-03-27 16:32:35
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-29 15:30:43
 * tips: 接口参数需罗列清楚
 */

import request from '@/utils/request';
import { stringify } from 'qs';

const basePrefix = 'Base-Module/Users';

/**
 * 获取个人信息
 * @param {number} isCollect	收藏标识  required	1 收藏/ 0 取消收藏
 * @param {number} itemId	    文章编号	required
 * @param {string} createUserCode	 	当前用户编号	required
 * @param {string} createUserName	 	当前用户姓名	required
 */
export async function queryUserInfo(params) {
  return request(`/api/${basePrefix}/GetUsersInfo?${stringify(params)}`);
}

/**
 * 获取个人信息
 * @param {number} ID
 * @param {string} createUserName	    文章编号	required
 * @param {string} createUserCode	 	当前用户编号	required
 * @param {string} uCode	 	当前用户学号
 */
export async function updateUserInfo(params) {
  return request(`/api/${basePrefix}/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 获取个人标签
 * @param {string} createUserCode	当前用户编号	required
 */
export async function queryTags(params) {
  return request(`/api/${basePrefix}/GetTags?${stringify(params)}`);
}

/**
 * 添加标签
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} createUserName	 	当前用户名	required
 * @param {string} label	标签名	required
 */
export async function addTag(params) {
  return request(`/api/${basePrefix}/AddTag`, {
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
  return request(`/api/${basePrefix}/DeleteTag`, {
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
  return request(`/api/${basePrefix}/GetSkills?${stringify(params)}`);
}
