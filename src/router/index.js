/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:44
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-13 10:46:54
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routesAll, defaultRoute, errRoute
} from './defaultRoutes'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点击菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || "/",
  routes: routesAll.concat(defaultRoute, errRoute)
})


export default router
