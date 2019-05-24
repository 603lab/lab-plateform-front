/*
 * @Author: chenxiaobin
 * @Date: 2019-03-27 16:32:35
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-25 04:56:18
 * tips: 接口参数需罗列清楚
 */

import request from '@/utils/request';
import { stringify } from 'qs';
import Store from '@/utils/store';

const basePrefix = 'Base-Module/Users';

/**
 * 获取个人信息
 * @param {number} isCollect	收藏标识  required	1 收藏/ 0 取消收藏
 * @param {number} itemId	    文章编号	required
 * @param {string} uCode	 	学号	required
 */
export async function queryUserInfo() {
  const { uCode = '' } = Store.getBasicInfo();
  const p = {
    uCode,
  };
  console.log('queryUserInfo p', p);
  return request(`/api/${basePrefix}/GetUsersInfo?${stringify(p)}`);
}

/**
 * 更新个人信息
 * @param {number} ID
 * @param {string} createUserName	    文章编号	required
 * @param {string} createUserCode	 	当前用户编号	required
 * @param {string} uCode	 	当前用户学号
 */
export async function updateUserInfo(params) {
  const { createUserName, createUserCode, uCode } = Store.getBasicInfo();
  const p = {
    ...params,
    uCode,
    createUserCode,
    createUserName,
  };
  return request(`/api/${basePrefix}/Update`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}

/**
 * 获取个人标签
 * @param {string} createUserCode	当前用户编号	required
 */
export async function queryTags(params) {
  const { createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
  };
  return request(`/api/${basePrefix}/GetTags?${stringify(p)}`);
}

/**
 * 添加标签
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} createUserName	 	当前用户名	required
 * @param {string} label	标签名	required
 */
export async function addTag(params) {
  const { createUserName, createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
    createUserName,
  };
  return request(`/api/${basePrefix}/AddTag`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}

/**
 * 删除标签
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} label	标签名	required
 */
export async function deleteTag(params) {
  const { createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
  };
  return request(`/api/${basePrefix}/DeleteTag`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}

/**
 * 获取用户技能
 * @param {string} createUserCode	当前用户编号	required
 */
export async function querySkills(params) {
  const { createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
  };
  return request(`/api/${basePrefix}/GetSkills?${stringify(p)}`);
}

/**
 * 更新用户技能
 * @param {string} createUserCode	当前用户编号	required
 * @param {string} createUserName	 	当前用户名	required
 * @param {array} skillList 技能列表
 * @param {string} skillList[item] 技能名称
 * @param {string} skillList[percent] 技能百分比
 */
export async function updateSkills(params) {
  const { createUserName, createUserCode } = Store.getBasicInfo();
  const p = {
    ...params,
    createUserCode,
    createUserName,
  };
  return request(`/api/${basePrefix}/UpdateSkill`, {
    method: 'POST',
    body: {
      ...p,
    },
  });
}
