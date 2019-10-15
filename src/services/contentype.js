import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取所有主题
export function getAllContentTypes(params) {
  return Gateway.get(`${Config.Gateway}/contentType/allContentType`, params);
}
// 管理员封禁主题，恢复
export function isdeleteContentType(params) {
  return Gateway.get(`${Config.Gateway}/contentType/isdeleteContentType`, params);
}
