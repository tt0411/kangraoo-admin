import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 登录
export function fakeAccountLogin(params) {
  return Gateway.get(`${Config.Gateway}/user/rootLogin`, params);
}
