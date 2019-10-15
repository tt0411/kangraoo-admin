import Config from '@/utils/config';
import Gateway from '@/utils/Gateway';

// 获取所有评论
export function getAllComment(params) {
    return Gateway.get(`${Config.Gateway}/comment/allComment`, params)
}

// 封禁，恢复评论
export function isStopcomment(params) {
    return Gateway.get(`${Config.Gateway}/comment/isStopcomment`, params)
}
