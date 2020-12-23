/**
 * @description: 全局api
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-08-12 15:16:26
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 09:49:20
 */

const api = {
    // 账户操作
    userLogin: "/passport/local", // 用户登录
    userLogout: "/account/logout", // 用户登出
    getPerms: "/account/getperms", // 获取权限
    checkDictName: "/api/dict/check", // 字典名称唯一验证
    checkDictItemName: "/api/dictitem/check", // 字典项值唯一验证
}

export default api;