import { queryCurrent, queryList, queryTags, querySkills } from '@/services/user';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    lists: [],
    tags: [],
    skills: [],
    currentUser: {},
  },

  effects: {
    // 用户信息
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      } else {
        message.error(`获取用户信息失败 ${msg}`);
      }
    },
    // 用户文章
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'saveList',
          payload: data,
        });
      } else {
        message.error(`获取用户文章失败 ${msg}`);
      }
    },
    // 个人标签
    *fetchTags({ payload }, { call, put }) {
      const response = yield call(queryTags, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'saveTags',
          payload: data,
        });
      } else {
        message.error(`获取用户标签失败 ${msg}`);
      }
    },
    // 饼图技能
    *fetchSkills({ payload }, { call, put }) {
      const response = yield call(querySkills, payload);
      const { statusCode, data, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'saveSkills',
          payload: data,
        });
      } else {
        message.error(`获取用户技能失败 ${msg}`);
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveList(state, action) {
      return {
        ...state,
        lists: action.payload || [],
      };
    },
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload || [],
      };
    },
    saveSkills(state, action) {
      return {
        ...state,
        skills: action.payload || [],
      };
    },
  },
};
