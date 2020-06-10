/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:42
 * @LastAuthor: lizlong
 * @lastTime: 2020-06-10 11:14:26
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  store
} from "@/store/index.js";
import global from "@/utils/global" //全局方法

import '@/utils/permissions' //全局路由钩子
import "@/plugins/element/element.js"; // 引入饿了么UI
import "@/plugins/svg/svg.js"; // 引入svg图标


Vue.use(global);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
