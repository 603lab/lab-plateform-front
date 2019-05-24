import {
  queryUserInfo,
  updateUserInfo,
  queryTags,
  addTag,
  deleteTag,
  querySkills,
  updateSkills,
} from '@/services/user';
import { message } from 'antd';
import Store from '@/utils/store';

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
    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryUserInfo, payload);
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
    // 更新用户信息
    *updateInfo({ payload }, { call, put }) {
      const response = yield call(updateUserInfo, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'fetchInfo',
          payload: {
            uCode: Store.getBasicInfo().uCode,
          },
        });
        message.success('更新用户信息成功');
      } else {
        message.error(`更新用户信息失败 ${msg}`);
      }
    },
    // 获取个人标签
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
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
    // 新增个人标签
    *addTag({ payload }, { call, put }) {
      const response = yield call(addTag, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success('添加成功！');
        yield put({
          type: 'fetchTags',
          payload: {
            createUserCode: Store.getBasicInfo().createUserCode,
          },
        });
        return true;
      }
      message.error(`添加个人标签失败 ${msg}`);
      return false;
    },
    // 删除个人标签
    *deleteTag({ payload }, { call, put }) {
      const response = yield call(deleteTag, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        message.success('删除成功！');
        yield put({
          type: 'fetchTags',
          payload: {
            createUserCode: Store.getBasicInfo().createUserCode,
          },
        });
        return true;
      }
      message.error(`删除个人标签失败 ${msg}`);
      return false;
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
    // 更新技能饼图
    *updateSkills({ payload }, { call, put }) {
      const response = yield call(updateSkills, payload);
      const { statusCode, msg } = response || {};
      if (statusCode === 200) {
        yield put({
          type: 'fetchSkills',
          payload: {
            createUserCode: Store.getBasicInfo().createUserCode,
          },
        });
        message.success('更新技能成功');
      } else {
        message.error(`更新技能失败 ${msg}`);
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
