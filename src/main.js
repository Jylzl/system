/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 13:48:12
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-05-08 11:51:47
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  store
} from "@/store/index.js";
import '@/utils/permissions' //全局路由钩子
import "./plugins/element/element.js"; // 引入饿了么UI
import "./plugins/svg/svg.js"; // 引入svg图标

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
