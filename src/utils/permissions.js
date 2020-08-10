/**
 * @description: 全局路由钩子、页面加载进度条
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-07 08:57:14
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from '@/utils/get-page-title'
import router from '@/router/index' //路由
import {
    store
} from "@/store/index.js"; //存储仓库
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
    let perms = store.state.power.perms; //store登录状态
    if ((token == null || token == undefined || token == "") && to.meta.open != true) {
        next('/login');
    } else {
        if (to.meta.open == true) {
            next();
        } else {
            if (perms) {
                next();
            } else {
                store.dispatch('setRouters').then((res) => {
                    if (res.code != 200) {
                        next('/login');
                    } else {
                        router.addRoutes(store.state.power.routes);
                        console.log(1)
                        console.log(router)
                        next({
                            ...to
                        }) // hack方法 确保addRoutes已完成
                    }
                })
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done();
});