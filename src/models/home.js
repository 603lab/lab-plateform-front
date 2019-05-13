import { getCommisionWork, getNotices, addTask } from '@/services/home';
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
    fetchTask(state, action) {
      return {
        ...state,
        noticeList: action.payload || [],
      };
    },
  },
};
