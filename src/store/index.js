/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-06-28 08:53:51
 */
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