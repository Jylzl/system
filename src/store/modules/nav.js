/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-25 17:09:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-27 21:36:32
 */
import {
  routes
} from '@/router/routes'

const nav = {
  // 设置属性
  state: {
    topNav: routes,
    leftNav: routes,
  },
  // 改变属性的状态
  mutations: {
    LEFT_ROUTERS: (state, data) => {
      const arr = routes.filter((item) => {
        return item.path == data
      })
      state.leftNav = arr[0].children == undefined ? [] : arr[0].children;
    },
  },
  // 应用mutaions
  actions: {
    setLeftRouters({ commit }, data) {
      commit('LEFT_ROUTERS', data);
    },
  }
}
export default nav