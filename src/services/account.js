/*
 * @Author: chenxiaobin
 * @Date: 2019-03-28 21:26:41
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-29 17:14:57
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
