import { getDocMenu } from '@/services/doc';
// import { message } from 'antd';

export default {
  namespace: 'doc',

  state: {
    menu: [],
  },

  effects: {
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(getDocMenu, payload);
      const { statusCode, data } = response; // eslint-disable-line
      console.log('response', response);
      // if (statusCode === 200) {
      yield put({
        type: 'setDocMenu',
        payload: data,
      });
      // } else {
      //   message.error(`获取百科菜单数据失败 ${response.message}`);
      // }
    },
  },

  reducers: {
    setDocMenu(state, action) {
      return {
        ...state,
        menu: action.payload,
      };
    },
  },
};
