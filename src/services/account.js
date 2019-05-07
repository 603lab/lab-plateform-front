/*
 * @Author: chenxiaobin
 * @Date: 2019-03-28 21:26:41
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-05-07 16:17:22
 */

import request from '@/utils/request';

const basicPrefix = 'Base-Module/Users';

/**
 * 登陆
 * @param {string} username	登录用户名	required
 * @param {string} password	 	登陆用户密码	required
 */
export async function fakeAccountLogin(params) {
  return request(`/api/${basicPrefix}/Login`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 重置密码
 * @param {string} uCode	 学号	required
 * @param {string} idcards	用户身份证	required
 * @param {string} phoneNumber	手机号	required
 */
export async function forgetPassword(params) {
  return request(`/api/${basicPrefix}/updatePassword`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
