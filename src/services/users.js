import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 启用禁用用户
export function isStopUser(params) {
  return Gateway.get(`${Config.Gateway}/user/isStopUser`, params);
}

// 重置测试用户密码
export function resetPwd(params) {
  return Gateway.put(`${Config.Gateway}/user/resetPwd`, params)
}

// 添加测试用户
export function addTestUser(params) {
  return Gateway.get(`${Config.Gateway}/user/addTestUser`, params)
}
