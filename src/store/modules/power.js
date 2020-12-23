/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 18:21:33
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
import {
    routes
} from '@/router/routes'
// import router from '@/router' //路由

//展示的用户信息
const power = {
    //设置属性
    state: {
        user: {},
        login: false, // 登录状态
        routes: routes,
        menus: [],
        perms: [],
    },
    //改变属性的状态
    mutations: {
        SET_PERMS: (state, params) => {
            state.user = params.user;
            state.menus = params.menus;
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
            state.user = {};
            state.menus = [];
            state.perms = [];
            state.login = false;
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
        }
    }
}
export default power