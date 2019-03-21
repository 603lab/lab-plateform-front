/*
 * @Author: chenxiaobin
 * @Date: 2019-03-21 15:53:08
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-21 17:20:53
 */
import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryList(params) {
  return request(`/api/Base-Module/Users/GetMyDocs?${stringify(params)}`);
}
