import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 登录
export function fakeAccountLogin(data) {
  return Gateway.post(`${Config.Gateway}/user/rootLogin`, data);
}
