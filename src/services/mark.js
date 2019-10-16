import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取文章点赞数
export function getMarkByCid(params) {
    return Gateway.get(`${Config.Gateway}/mark/markCountByCid`, params)
}
