import { queryProjectList, queryProjectNotice } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'project',

  state: {
    list: [],
    notice: [],
  },

  effects: {
    // 获取项目列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProjectList, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'setProjectList',
          payload: data,
        });
        return data;
      }
      message.error(`获取项目列表失败 ${msg}`);
      return false;
    },

    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    setProjectList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};
