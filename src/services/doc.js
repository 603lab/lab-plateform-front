import request from '@/utils/request';
// import { stringify } from 'qs';

export async function getDocMenu() {
  return request(`/api/doc/menu`);
}
