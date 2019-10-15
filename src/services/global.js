import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取今日新增用户
export function getTodayAddUser(params) {
  return Gateway.get(`${Config.Gateway}/user/todayAddUser`, params)
}
// 获取所有用户
export function getAllUser(params) {
  return Gateway.get(`${Config.Gateway}/user/totalUser`, params)
}
// 获取今日内容量
export function getTodayContent(params) {
  return Gateway.get(`${Config.Gateway}/content/todayContent`, params)
}
// 获取所有内容量
export function getAllContent(params) {
  return Gateway.get(`${Config.Gateway}/content/allContentsRoot`, params)
}
// 获取近七天新增用户
export function getSevenDayAddUser() {
  return Gateway.get(`${Config.Gateway}/user/sevenDaysAddUser`)
}
// 获取今日用户活跃排名
export function getTodayActiveUser() {
  return Gateway.get(`${Config.Gateway}/user/activeUsers`)
}
// 获取男女比例
export function getGenderRate() {
  return Gateway.get(`${Config.Gateway}/user/genderRate`)
}
// 获取在线离线比例
export function getLivedRate() {
  return Gateway.get(`${Config.Gateway}/user/liveRate`)
}
// 获取今日内容增量比
export function getTodayContentRate() {
  return Gateway.get(`${Config.Gateway}/content/todayContentRate`)
}
// 获取今日主题增量比
export function getTodayContentTypeRate() {
  return Gateway.get(`${Config.Gateway}/contentType/todayContentType`)
}
