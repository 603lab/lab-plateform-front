import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/Base-Module/Users/GetUsersInfo');
}

export async function querySkills(params) {
  return request(`/api/userSkills?${stringify(params)}`);
}
