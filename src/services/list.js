/*
 * @Author: chenxiaobin
 * @Date: 2019-03-21 15:53:08
 * @Last Modified by: chenxiaobin
 * @Last Modified time: 2019-03-27 16:45:13
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
