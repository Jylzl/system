/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-03 18:19:43
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 15:41:30
 */
import request from '@/utils/request'
import api from '@/api/api';
// 用户登陆
export function userLogin(data) {
    return request({
        url: api.userLogin,
        method: 'post',
        data
    })
}

// 退出登陆
export function userLogout(data) {
    return request({
        url: api.userLogout,
        method: 'get',
        params: data
    })
}

// 退出登陆
export function getPerms(data) {
    return request({
        url: api.getPerms,
        method: 'get',
        params: data
    })
}