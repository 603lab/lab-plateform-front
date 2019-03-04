import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCommisionWork(params) {
  return request(`/api/home/commision-work?${stringify(params)}`);
}
