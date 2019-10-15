import { getAllUser } from '@/services//global'
import { getAllComment, isStopcomment } from '@/services/comment';
import { Message } from 'antd';

const namespace = 'comment';
export default {
  namespace,
  state: {
    dataList: [],
    totalNum: 0,
    commentUserList: [],
    searchCond: {
      page: 1,
      per: 10,
    },
  },
  effects: {
    *fetchList(_, { call, put, select }) {
      const searchCond = yield select(state => state[namespace].searchCond);
      const rsp = yield call(getAllComment, searchCond);
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
                commentUserList: list,
            },
          });
        }
      },
   *isStopcomment({ payload }, { call, put }) {
    const rsp = yield call(isStopcomment, payload);
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
    changeUserDataList(state, { payload }) {
        return {
          ...state,
          commentUserList: payload.commentUserList,
        };
      },
  },
};
