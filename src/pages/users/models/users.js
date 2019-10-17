import { Message } from 'antd'
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { getAllUser } from '@/services/global';
import { isStopUser, resetPwd, addTestUser } from '@/services/users'

const namespace = 'users';
export default {
  namespace,
  state: {
    dataList: [],
    totalNum: 0,
    searchCond: {
      page: 1,
      per: 10,
    },
  },
  effects: {
    *fetchList(_, { call, put, select }) {
      if (!localStorage.getItem('userName')) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
        Message.error('未登录，请重新登录');
      }
      const searchCond = yield select(state => state[namespace].searchCond);
      const rsp = yield call(getAllUser, searchCond);
      const { list, count } = rsp;
      if (rsp && rsp.list) {
        yield put({
          type: 'changeDataList',
          payload: {
            dataList: list,
            totalNum: count,
          },
        });
      }
    },
    *changeUserFlag({ payload }, { call, put }) {
      const rsp = yield call(isStopUser, payload);
      if (rsp && rsp.code === 200) {
       Message.success(rsp.msg)
       yield put({
        type: 'fetchList',
       })
      } else {
        Message.error(rsp.msg)
      }
    },
    *resetPwd({ payload }, { call }) {
      const rsp = yield call(resetPwd, payload);
      if (rsp && rsp.code === 200) {
         Message.success(rsp.msg)
      } else {
        Message.error(rsp.msg)
      }
    },
    *addTestUser({ payload }, { call, put }) {
      const rsp = yield call(addTestUser, payload)
      if (rsp && rsp.code === 200) {
        Message.success(rsp.msg)
        yield put({
          type: 'fetchList',
         })
       } else {
        Message.error(rsp.msg)
      }
      return rsp.code
    },
  },
  reducers: {
    changeDataList(state, { payload }) {
      return {
        ...state,
        dataList: payload.dataList,
        totalNum: payload.totalNum,
      };
    },
    changeSearchCond(state, { payload }) {
      return {
        ...state,
        searchCond: payload,
      };
    },
  },
};
