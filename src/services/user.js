import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/api/Base-Module/Users/GetUsersInfo?${stringify(params)}`);
}

export async function queryTags(params) {
  return request(`/api/Base-Module/Users/GetTags?${stringify(params)}`);
}

export async function querySkills(params) {
  return request(`/api/Base-Module/Users/GetSkills?${stringify(params)}`);
}
