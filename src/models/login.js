import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeAccountLogin } from '@/services/login';


const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
        const rsp = yield call(fakeAccountLogin, payload);
        if (rsp.code === 200) {
          localStorage.setItem('userName', rsp.name)
          yield put(routerRedux.replace('/'));
        // eslint-disable-next-line no-empty
        } else {
            message.error(rsp.msg)
        }
      },
    },
  }
export default Model;
