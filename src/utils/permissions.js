/**
 * @description: 全局路由钩子、页面加载进度条
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-16 17:53:08
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from '@/utils/get-page-title'
import router from '@/router/index' //路由
import store from "@/store/index.js"; //存储仓库
import {
    setToken,
    getToken
} from '@/utils/auth'

router.beforeEach((to, from, next) => {
    // 单点登陆时把url中的token存进cookies
    if (to.query.token && to.query.token != null && to.query.token != undefined) {
        localStorage.setItem('access_token', to.query.token); //将token存进localStorage
        setToken(to.query.token); //将token存进cookies
    }

    // 页面加载进度条
    NProgress.start();

    // 设置页面标题
    document.title = getPageTitle(to.meta.title)

    let token = getToken() || localStorage.getItem("access_token"); //登录标示
    let login = store.state.power.login; //store登录状态
    if ((token == null || token == undefined || token == "") && to.meta.open != true) {
        next('/login');
    } else {
        if (to.meta.open == true) {
            next();
        } else {
            if (login) {
                next();
            } else {
                try {
                    console.log("路由载入中...")
                    store.dispatch('setRouters').then(() => {
                        console.log("路由载入完...")
                        next({
                            ...to, replace: true
                        }) // hack方法 确保addRoutes已完成
                    }).catch(() => {
                        next("/login");
                    });
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                } catch (error) {
                    // remove token and go to login page to re-login
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done();
});