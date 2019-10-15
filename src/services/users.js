import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 启用禁用用户
export function isStopUser(params) {
  return Gateway.get(`${Config.Gateway}/user/isStopUser`, params);
}
