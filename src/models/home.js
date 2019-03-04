import { getCommisionWork } from '@/services/home';
import { message } from 'antd';

export default {
  namespace: 'home',

  state: {
    commisionWork: [],
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
  },

  reducers: {
    setCommisionWork(state, action) {
      return {
        ...state,
        commisionWork: action.payload,
      };
    },
  },
};
