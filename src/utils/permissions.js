/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-02-25 11:29:41
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-05-08 11:52:42
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from '@/utils/get-page-title'
import router from '@/router/index' //路由

import {
    setToken,
    // getToken
} from '@/utils/auth'

router.beforeEach((to, from, next) => {
    // 单点登陆时把url中的token存进cookies
    if (to.query.token && to.query.token != null && to.query.token != undefined) {
        localStorage.setItem('sessionKey', to.query.token); //将token存进localStorage
        setToken(to.query.token); //将token存进cookies
    }

    // 页面加载进度条
    NProgress.start();

    // 设置页面标题
    document.title = getPageTitle(to.meta.title)

    // 获取登录状态
    // let token = getToken() || localStorage.getItem("sessionKey"); //登录标示

    next();
})

router.afterEach(() => {
    NProgress.done();
});