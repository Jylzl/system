/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 14:06:13
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-04-30 15:46:32
 */
const work = r => require.ensure([], () => r(require('@/views/work/Work.vue')), 'work') // 工作台


let ansycRoutes = new Map()

ansycRoutes.set("work", work) // 工作台

export {
    ansycRoutes
}