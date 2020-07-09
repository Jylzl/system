/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-09 19:04:32
 */
import Vue from 'vue'
import Vuex from 'vuex'

import power from "@/store/module/power"
import system from "@/store/module/system"

import getters from '@/store/getters'
Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    power,
    system
  },
  getters
})