import { queryList } from '@/services/list';
import { message } from 'antd';

export default {
  namespace: 'list',

  state: {
    article: [],
  },

  effects: {
    // 获取用户文章
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'setArticleList',
          payload: data,
        });
      } else {
        message.error(`获取用户文章失败 ${msg}`);
      }
    },
  },

  reducers: {
    setArticleList(state, action) {
      return {
        ...state,
        article: action.payload,
      };
    },
  },
};
