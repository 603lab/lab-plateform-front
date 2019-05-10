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
