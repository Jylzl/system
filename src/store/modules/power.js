/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:45:47
 */

import {
    Encrypt
} from "@/utils/aes.js";
import {
    userLogin, getPerms, userLogout
} from "@/api/land.js";
import {
    setToken,
    removeToken
} from '@/utils/auth'
import code from '@/code/code';
import router from '@/router/index' //路由
import {
    ansycRoute
} from '@/router/ansycRoutes'

//展示的用户信息
const power = {
    //设置属性
    state: {
        user: {
            powUserInf: {},
            powRole: [],
        },
        login: false, // 登录状态
        routes: [],
        menus: [],
        perms: [],

        topNav: [],
        leftNav: [],
    },
    //改变属性的状态
    mutations: {
        SET_PERMS: (state, params) => {
            state.user = params.user;
            state.menus = ansycRoute || params.menus;
            state.topNav = ansycRoute || params.menus;
            state.perms = params.perms;
            state.login = true;
        },
        LOGING_STATE: (state, params) => {
            localStorage.setItem('access_token', params.token); //将token存进localStorage
            setToken(params.token); //将token存进cookies
            state.user = params.user;
            state.menus = params.menus;
            state.perms = params.perms;
            state.login = true;
        },
        LOGOUT_STATE: (state,) => {
            localStorage.setItem('access_token', ""); // 清空token
            removeToken(); //清空token
            state.user = {
                powUserInf: {},
                powRole: [],
            };
            state.menus = [];
            state.perms = [];
            state.login = false;
        },
        LEFT_ROUTERS: (state, data) => {
            const arr = ansycRoute.filter((item) => {
                return item.path == data
            })
            state.leftNav = arr[0].children == undefined ? [] : arr[0].children;
        },
    },
    //应用mutaions
    actions: {
        userLogin({ commit }, data) {
            const remember = data.rememberPswd;
            const username = data.user;
            const password = Encrypt(data.pswd, process.env.VUE_APP_aesKey, process.env.VUE_APP_ivKey); //密码加密
            return new Promise((resolve, reject) => {
                userLogin({
                    username,
                    password,
                    remember
                }).then(res => {
                    if (res.code == code.success) {
                        commit('LOGING_STATE', res.data); //执行登陆成功的方法
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err);
                });
            });
        },
        setRouters({ commit }) {
            return new Promise((resolve, reject) => {
                getPerms().then(res => {
                    if (res.code == code.success) {
                        commit('SET_PERMS', res.data); //执行登陆成功的方法
                        router.addRoutes(ansycRoute);
                        resolve(res)
                    } else {
                        reject(false);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
        userLogout({ commit }) {
            return new Promise((resolve, reject) => {
                userLogout().then(res => {
                    if (res.code == code.success) {
                        commit('LOGOUT_STATE'); //执行登出成功的方法
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err);
                });
            });
        },
        setLeftRouters({ commit }, data) {
            commit('LEFT_ROUTERS', data);
        },
    }
}
export default power