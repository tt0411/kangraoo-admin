import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取所有点赞记录
export function getAllmark(params) {
    return Gateway.get(`${Config.Gateway}/mark/allMark`, params)
}

// 获取文章点赞数
export function getMarkByCid(params) {
    return Gateway.get(`${Config.Gateway}/mark/markCountByCid`, params)
}
