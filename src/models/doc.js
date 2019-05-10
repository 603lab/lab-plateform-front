import { getDocMenu, searchArticle } from '@/services/doc';
import { message } from 'antd';

export default {
  namespace: 'doc',

  state: {
    menu: [],
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(searchArticle, payload);
      const { statusCode, data } = response;
      if (statusCode === 200) {
        yield put({
          type: 'setArticleList',
          payload: data,
        });
      } else {
        message.error(`搜索失败 ${response.msg}`);
      }
    },
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(getDocMenu, payload);
      const { statusCode, data } = response; // eslint-disable-line
      if (statusCode === 200) {
        yield put({
          type: 'setDocMenu',
          payload: data,
        });
      } else {
        message.error(`获取百科菜单数据失败 ${response.msg}`);
      }
    },
  },

  reducers: {
    setDocMenu(state, action) {
      return {
        ...state,
        menu: action.payload,
      };
    },
    setArticleList(state, action) {
      return {
        ...state,
        articleList: action.payload,
      };
    },
  },
};
