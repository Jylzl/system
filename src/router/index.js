/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 13:48:12
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-04-30 14:04:21
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes
} from './routes'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
