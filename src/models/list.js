import { queryList, likeArticle } from '@/services/list';
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
        return data;
      }
      message.error(`获取用户文章失败 ${msg}`);
      return false;
    },

    // 文章点赞
    *like({ payload }, { call }) {
      const response = yield call(likeArticle, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        return true;
      }
      message.error(`点赞失败 ${msg}`);
      return false;
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
