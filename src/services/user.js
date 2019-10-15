import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';
// 当前用户
export function getcurrent() {
  return Gateway.get(`${Config.GatewayAdmin}current_operator`, {});
}
