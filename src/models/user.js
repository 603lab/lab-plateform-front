import { query as queryUsers, queryCurrent, querySkills } from '@/services/user';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      const { statusCode, data } = response;
      if (statusCode === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
        // 获取饼图技能
        yield put({ type: 'getSkills', payload: { createUserCode: data.uCode } });
      } else {
        message.error(`获取当前用户信息失败 ${response.message}`);
      }
    },
    // 饼图技能
    *getSkills({ payload }, { call, put }) {
      const response = yield call(querySkills, payload);
      yield put({
        type: 'saveSkills',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    saveSkills(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          skills: action.payload || {},
        },
      };
    },
  },
};
