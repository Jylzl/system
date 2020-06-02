/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-20 23:02:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-04-30 15:36:41
 */
import Vue from 'vue'
import Vuex from 'vuex'

import power from "@/store/module/power"

import getters from '@/store/getters'
Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    power
  },
  getters
})