import { Message } from 'antd'
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { getAllContentTypes, isdeleteContentType } from '@/services/contentype'

const namespace = 'contentype';
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
      const rsp = yield call(getAllContentTypes, searchCond);
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
    *changeContenTypeStatus({ payload }, { call, put }) {
      const rsp = yield call(isdeleteContentType, payload);
      if (rsp) {
       Message.success('操作成功')
       yield put({
        type: 'fetchList',
       })
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
  },
};
