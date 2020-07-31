/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 15:17:56
 */

import {
    Encrypt
} from "@/utils/aes.js";
import {
    userLogin
} from "@/api/land.js";
import {
    setToken,
    removeToken
} from '@/utils/auth'
import code from '@/code/code';
import {
    routes
} from '@/router/routes'
//展示的用户信息
const power = {
    //设置属性
    state: {
        routes: routes,
        leftRouters: []
    },
    //改变属性的状态
    mutations: {
        LEFT_ROUTERS: (state, data) => {
            state.leftRouters = data;
        },
        LOGING_STATE: (state, params) => {
            localStorage.setItem('sessionKey', params.token); //将token存进localStorage
            setToken(params.token); //将token存进cookies
            state.user = params.user;
        },
    },
    //应用mutaions
    actions: {
        setLeftRouters({ commit }, data) {
            console.log(1)
            console.log(data)
            commit('LEFT_ROUTERS', data);
        },
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
                    reject(false);
                    console.log(err)
                });
            });
        }
    }
}
export default power