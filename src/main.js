/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:42
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 10:33:00
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
import "@/plugins/iconfont/iconfont.js"; // 引入iconfont图标

import VueAMap from 'vue-amap';


Vue.use(global);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '4d73249f0948da6c9d5bfc507ff59cf0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0',
  v: '1.4.4'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
