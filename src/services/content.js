import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 封禁，解封内容
export function isStopContent(params) {
  return Gateway.get(`${Config.Gateway}/content/isStopContent`, params);
}
