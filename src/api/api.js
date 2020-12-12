/**
 * @description: 全局api
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-08-12 15:16:26
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-12 17:10:42
 */

const api = {
    // 账户操作
    userLogin: "/passport/local", // 用户登录
    userLogout: "/account/logout", // 用户登出
    getPerms: "/account/getperms", // 获取权限
}

export default api;