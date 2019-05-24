import {
  getCommisionWork,
  getNotices,
  addTask,
  editTask,
  getUsers,
  followUser,
  getArticles,
} from '@/services/home';
import { message } from 'antd';

export default {
  namespace: 'home',

  state: {
    commisionWorkList: [],
    noticeList: [],
  },

  effects: {
    *fetchCommisionWork({ payload }, { call, put }) {
      const response = yield call(getCommisionWork, payload);
      const { statusCode, data } = response;
      if (statusCode === 200) {
        yield put({
          type: 'setCommisionWork',
          payload: data,
        });
      } else {
        message.error(`获取代办工作数据失败 ${response.message}`);
      }
    },

    // 添加待办工作
    *addTask({ payload }, { call, put }) {
      const response = yield call(addTask, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'fetchTask',
          payload: {
            createUserCode: '150701206',
          },
        });
        message.success('添加任务成功');
        yield put({
          type: 'fetchCommisionWork',
          payload: {
            createUserCode: '150701206',
            isDone: 0,
            pageSize: 20,
            currentPage: 1,
          },
        });
      } else {
        message.error(`添加任务失败 ${msg}`);
      }
    },

    // 编辑任务
    *editTask({ payload }, { call, put }) {
      const response = yield call(editTask, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success('编辑成功');
        yield put({
          type: 'fetchCommisionWork',
          payload: {
            createUserCode: '150701206',
            isDone: 0,
            pageSize: 20,
            currentPage: 1,
          },
        });
      } else {
        message.error(`编辑任务失败 ${msg}`);
      }
    },

    // 编辑任务
    *deleteTask({ payload }, { call, put }) {
      const response = yield call(editTask, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success('删除成功');
        yield put({
          type: 'fetchCommisionWork',
          payload: {
            createUserCode: '150701206',
            isDone: 0,
            pageSize: 20,
            currentPage: 1,
          },
        });
      } else {
        message.error(`删除任务失败 ${msg}`);
      }
    },

    // 关注取消关注
    *follow({ payload }, { call, put }) {
      const response = yield call(followUser, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success(msg);
        yield put({
          type: 'fetchUsers',
          payload: {
            uCode: '150701206',
            leaderType: '前端',
            pageSize: 10,
            currentPage: 1,
          },
        });
      } else {
        message.error(`关注状态变更失败 ${msg}`);
      }
    },

    // 获取推荐大佬
    *fetchUsers({ payload }, { call, put }) {
      const response = yield call(getUsers, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'setUserList',
          payload: data,
        });
        return data;
      }
      message.error(`获取大佬失败 ${msg}`);
      return false;
    },

    // 获取推荐文章
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(getArticles, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'setArticleList',
          payload: data,
        });
        return data;
      }
      message.error(`获取推荐文章失败 ${msg}`);
      return false;
    },

    // 获取公示栏
    *fetchNoticesBoard({ payload }, { call, put }) {
      const response = yield call(getNotices, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'setNoticeList',
          payload: data,
        });
        return data;
      }
      message.error(`获取公示栏失败 ${msg}`);
      return false;
    },
  },

  reducers: {
    setCommisionWork(state, action) {
      return {
        ...state,
        commisionWorkList: action.payload,
      };
    },
    setNoticeList(state, action) {
      return {
        ...state,
        noticeList: action.payload || [],
      };
    },
    setUserList(state, action) {
      return {
        ...state,
        userList: action.payload || [],
      };
    },
    setArticleList(state, action) {
      return {
        ...state,
        articleList: action.payload || [],
      };
    },
    fetchTask(state, action) {
      return {
        ...state,
        noticeList: action.payload || [],
      };
    },
  },
};
