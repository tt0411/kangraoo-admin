import { getAllUser } from '@/services/global'
import { getAllSave } from '@/services/save';

const namespace = 'save';
export default {
  namespace,
  state: {
    dataList: [],
    totalNum: 0,
    saveUserList: [],
    searchCond: {
      page: 1,
      per: 10,
    },
  },
  effects: {
    *fetchList(_, { call, put, select }) {
      const searchCond = yield select(state => state[namespace].searchCond);
      const rsp = yield call(getAllSave, searchCond);
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
                saveUserList: list,
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
          saveUserList: payload.saveUserList,
        };
      },
  },
};
