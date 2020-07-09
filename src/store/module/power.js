/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-09 21:11:59
 */

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
    },
    //应用mutaions
    actions: {
        setLeftRouters({ commit }, data) {
            console.log(1)
            console.log(data)
            commit('LEFT_ROUTERS', data);
        }
    }
}
export default power