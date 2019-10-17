import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { getAllUser } from '@/services/global'
import { getAllmark } from '@/services/mark';

const namespace = 'mark';
export default {
  namespace,
  state: {
    dataList: [],
    totalNum: 0,
    markUserList: [],
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
        message.error('未登录，请重新登录');
      }
      const searchCond = yield select(state => state[namespace].searchCond);
      const rsp = yield call(getAllmark, searchCond);
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
    *fetchUserList(_, { call, put }) {
        const searchCond = {
            page: 1,
            per: 10000,
        }
        const rsp = yield call(getAllUser, searchCond);
        const { list } = rsp;
        if (rsp && rsp.list) {
          yield put({
            type: 'changeUserDataList',
            payload: {
                markUserList: list,
            },
          });
        }
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
    changeUserDataList(state, { payload }) {
        return {
          ...state,
          markUserList: payload.markUserList,
        };
      },
  },
};
