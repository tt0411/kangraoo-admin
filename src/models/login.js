import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { stringify } from 'querystring';
import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
        const rsp = yield call(fakeAccountLogin, payload);
        if (rsp.code === 200) {
          localStorage.setItem('userName', rsp.name)
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
        // eslint-disable-next-line no-empty
        } else {
            message.error(rsp.msg)
        }
      },
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      message.error('未登录，请重新登录');
      localStorage.clear();
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  }
export default Model;
