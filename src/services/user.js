import request from '@/utils/request';
import { stringify } from 'qs';

const baseUrl = 'Base-Module/Users';
export async function queryList(params) {
  return request(`/api/${baseUrl}/GetMyDocs?${stringify(params)}`);
}

export async function queryCurrent(params) {
  return request(`/api/${baseUrl}/GetUsersInfo?${stringify(params)}`);
}

export async function queryTags(params) {
  return request(`/api/${baseUrl}/GetTags?${stringify(params)}`);
}

// 添加标签
export async function addTags(params) {
  return request(`/api/${baseUrl}/AddTag`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function querySkills(params) {
  return request(`/api/${baseUrl}/GetSkills?${stringify(params)}`);
}
