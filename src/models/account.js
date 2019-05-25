import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { fakeAccountLogin, forgetPassword } from '@/services/account';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';
import Store from '@/utils/store';

export default {
  namespace: 'account',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      const { statusCode, data, msg } = response;
      // Login successfully
      if (statusCode === 200) {
        message.success(`登陆成功`);
        // 存储全局信息
        Store.setStore({
          basicInfo: {
            ...data,
          },
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error(`登陆失败 ${msg}`);
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },

    *forget({ payload }, { call }) {
      const response = yield call(forgetPassword, payload);
      const { msg, statusCode } = response;
      if (statusCode === 200) {
        message.success(`密码重置成功 603+学号`);
      } else {
        message.error(`密码重置失败 ${msg}`);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
