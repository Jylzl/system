/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 11:07:45
 * @LastEditTime: 2020-04-27 22:12:58
 * @LastEditors: OBKoro1
 */

/**
 * @description: 全局api
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-08-12 15:16:26
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 15:42:20
 */

const api = {
    // 账户操作
    userLogin: "/account/login", // 用户登录
    userLogout: "/account/logout", // 用户登出
    getPerms: "/account/getperms", // 获取权限
    // 菜单管理
    meunList: "/system/menu/list", // 菜单列表
    menuTree: "/system/menu/menuTreeData", // 菜单树
}

export default api;