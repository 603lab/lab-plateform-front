import { queryCurrent, queryTags, querySkills, addTags } from '@/services/user';
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
    // 获取用户信息
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
    // 获取个人标签
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
    // 获取饼图技能
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
    // 新增个人标签
    *addTags({ payload }, { call }) {
      const response = yield call(addTags, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success('添加成功！');
        return true;
      }
      message.error(`添加个人标签失败 ${msg}`);
      return false;
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
