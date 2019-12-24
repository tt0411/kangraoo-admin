import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取所有主题
export function getAllContentTypes(params) {
  return Gateway.get(`${Config.Gateway}/theme/allTheme`, params);
}
// 管理员审核主题
export function checkContentType(params) {
  return Gateway.get(`${Config.Gateway}/theme/checkTheme`, params);
}
