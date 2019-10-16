import { Message } from 'antd';
import { getAllContent } from '@/services/global';
import { isStopContent } from '@/services/content';
import { getCommentByCid } from '@/services/comment'
import { getSaveByCid } from '@/services/save'
import { getMarkByCid } from '@/services/mark'

const namespace = 'content';
export default {
  namespace,
  state: {
    dataList: [],
    commentList: [],
    id: null,
    commentCount: 0,
    saveCount: 0,
    markCount: 0,
    totalNum: 0,
    searchCond: {
      page: 1,
      per: 10,
    },
  },
  effects: {
    *fetchList(_, { call, put, select }) {
      const searchCond = yield select(state => state[namespace].searchCond);
      const rsp = yield call(getAllContent, searchCond);
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
    *fetchCommentList(_, { call, put, select }) {
      const id = yield select(state => state[namespace].id);
      const rsp = yield call(getCommentByCid, id);
      const { list, count } = rsp;
      if (rsp && rsp.list) {
        yield put({
          type: 'changeCommentList',
          payload: {
            commentList: list,
            commentCount: count,
          },
        });
      }
    },
    *fetchSaveList(_, { call, put, select }) {
      const id = yield select(state => state[namespace].id);
      const rsp = yield call(getSaveByCid, id);
      const { count } = rsp;
      if (rsp) {
        yield put({
          type: 'changeSaveList',
          payload: {
            saveCount: count,
          },
        });
      }
    },
    *fetchMarkList(_, { call, put, select }) {
      const id = yield select(state => state[namespace].id);
      const rsp = yield call(getMarkByCid, id);
      const { count } = rsp;
      if (rsp) {
        yield put({
          type: 'changeMarkList',
          payload: {
            markCount: count,
          },
        });
      }
    },
   *isStopContent({ payload }, { call, put }) {
    const rsp = yield call(isStopContent, payload);
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
    changeCommentList(state, { payload }) {
      return {
        ...state,
        commentList: payload.commentList,
        commentCount: payload.commentCount,
      };
    },
    changeSaveList(state, { payload }) {
      return {
        ...state,
        saveCount: payload.saveCount,
      };
    },
    changeMarkList(state, { payload }) {
      return {
        ...state,
        markCount: payload.markCount,
      };
    },
    changeSearchCond(state, { payload }) {
      return {
        ...state,
        searchCond: payload,
      };
    },
    changeCid(state, { payload }) {
      return {
        ...state,
        id: payload,
      };
    },
  },
};
