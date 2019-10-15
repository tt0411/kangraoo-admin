import { getAllUser, getTodayContent, getAllContent, getSevenDayAddUser, getTodayActiveUser, getGenderRate, getLivedRate, getTodayContentRate, getTodayContentTypeRate } from '@/services/global'

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    totalUser: 0,
    todayContent: 0,
    totalContent: 0,
    sevenDaysData: [],
    todayActiveUser: [],
    genderRate: [],
    liveRate: [],
    liveCount: 0,
    todayContentCount: 0,
    todayContentRate: 0,
    totalContentType: 0,
    todayContentTypeRate: 0,
    todayContentTypeCount: 0,
  },
  effects: {
    *fetchWelcome(_, { call, put, all }) {
      const conf = {
        per: 8,
        page: 1,
      }
      let totalUser = 0;
      let todayContent = 0;
      let totalContent = 0;
      let todayContentCount = 0;
      let todayContentRate = 0;
      let todayContentTypeCount = 0;
      let todayContentTypeRate = 0;
      let totalContentType = 0;
      // eslint-disable-next-line max-len
      const [totalUserRsp, todayContentRsp, totalContentRsp, todayContentRateRsp, todayContentTypeRateRsp] = yield all([
        call(getAllUser, conf),
        call(getTodayContent, conf),
        call(getAllContent, conf),
        call(getTodayContentRate),
        call(getTodayContentTypeRate),
      ]);
      if (totalUserRsp) {
        totalUser = totalUserRsp.count;
      }
      if (todayContentRsp) {
        todayContent = todayContentRsp.count;
      }
      if (totalContentRsp) {
        totalContent = totalContentRsp.count;
      }
      if (todayContentRateRsp) {
        todayContentCount = todayContentRateRsp.data.count;
        todayContentRate = todayContentRateRsp.data.rate;
      }
      if (todayContentTypeRateRsp) {
        todayContentTypeCount = todayContentTypeRateRsp.data.count;
        todayContentTypeRate = todayContentTypeRateRsp.data.rate;
        totalContentType = todayContentTypeRateRsp.data.allCount;
      }
      yield put({
        type: 'set',
        // eslint-disable-next-line max-len
        payload: { totalUser, todayContent, totalContent, todayContentCount, todayContentRate, todayContentTypeCount, todayContentTypeRate, totalContentType },
      })
    },
    *fetchChart(_, { call, put, all }) {
      let sevenDaysData = [];
      let todayActiveUser = [];
      let genderRate = [];
      let liveRate = [];
      let liveCount = [];
      const [sevenDaysDataRsp, todayActiveUserRsp, genderRateRsp, liveRateRsp] = yield all([
        call(getSevenDayAddUser),
        call(getTodayActiveUser),
        call(getGenderRate),
        call(getLivedRate),
      ])
      if (sevenDaysDataRsp) {
        sevenDaysData = sevenDaysDataRsp.data;
      }
      if (todayActiveUserRsp) {
        todayActiveUser = todayActiveUserRsp.data;
      }
      if (genderRateRsp) {
         genderRate = genderRateRsp.data;
      }
      if (liveRateRsp) {
         liveRate = liveRateRsp.data;
         liveCount = liveRateRsp.data[0].count;
      }
      yield put({
        type: 'set',
        payload: { sevenDaysData, todayActiveUser, genderRate, liveRate, liveCount },
      })
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}


 export default GlobalModel;
