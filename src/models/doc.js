import {
  getDocMenu,
  searchArticle,
  getDocDetail,
  collectArticle,
  fetchComments,
  addComment,
} from '@/services/doc';
import { message } from 'antd';

export default {
  namespace: 'doc',

  state: {
    menu: [],
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(searchArticle, payload);
      const { statusCode, data, msg } = response;
      if (statusCode === 200) {
        yield put({
          type: 'setArticleList',
          payload: data,
        });
      } else {
        message.error(`搜索失败 ${msg}`);
      }
    },
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(getDocMenu, payload);
      const { statusCode, data, msg } = response; // eslint-disable-line
      if (statusCode === 200) {
        yield put({
          type: 'setDocMenu',
          payload: data,
        });
      } else {
        message.error(`获取百科菜单数据失败 ${msg}`);
      }
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(getDocDetail, payload);
      const { statusCode, data, msg } = response;
      if (statusCode === 200) {
        yield put({
          type: 'setDocDetail',
          payload: data,
        });
        return data.isCollected;
      }
      message.error(`获取文章详情失败 ${msg}`);
      return false;
    },
    *collect({ payload }, { call }) {
      const response = yield call(collectArticle, payload);
      const { statusCode, msg } = response;
      if (statusCode === 200) {
        message.success(msg);
        return 1;
      }
      message.error(msg);
      return 0;
    },
    // 获取所有评论
    *fetchComments({ payload }, { call, put }) {
      const response = yield call(fetchComments, payload);
      const { statusCode, data, msg } = response;
      if (statusCode === 200) {
        yield put({
          type: 'setDocComment',
          payload: data,
        });
      } else {
        message.error(`获取文章评论失败 ${msg}`);
      }
    },
    // 新增评论
    *addComment({ payload }, { call, put }) {
      const response = yield call(addComment, payload);
      const { statusCode, msg } = response;
      const { docId, createUserCode, createUserName } = payload;
      if (statusCode === 200) {
        message.success(`评论成功`);
        yield put({
          type: 'fetchComments',
          payload: {
            ID: docId,
            createUserCode,
            createUserName,
          },
        });
        return true;
      }
      message.error(`评论失败 ${msg}`);
      return false;
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
    setDocDetail(state, action) {
      return {
        ...state,
        articleDetail: action.payload,
      };
    },
    setDocComment(state, action) {
      return {
        ...state,
        articleComment: action.payload,
      };
    },
  },
};
