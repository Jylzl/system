/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-03 18:19:43
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-13 10:12:07
 */
import request from '@/utils/request'
import api from '@/api/api';
import serviceSso from "@/utils/requestsso";
// 用户登陆
export function userLogin(data) {
    return request({
        url: api.userLogin,
        method: 'post',
        data
    })
}
// sso用户登陆
export function userSso(data) {
    return serviceSso({
        url: api.ssoLogin,
        method: 'post',
        data
    })
}

// 退出登陆
export function userLogout(data) {
    return request({
        url: api.userLoginout,
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