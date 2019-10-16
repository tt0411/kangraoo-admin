import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取所有收藏
export function getAllSave(params) {
    return Gateway.get(`${Config.Gateway}/save/allSave`, params)
}

// 获取文章点赞数
export function getSaveByCid(params) {
    return Gateway.get(`${Config.Gateway}/save/saveCountByCid`, params)
}
