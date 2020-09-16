/**
 * @description: 页面组件声明，需要异步
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:44
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-16 11:32:01
 */
const work = r => require.ensure([], () => r(require('@/views/work/Work.vue')), 'work') // 工作台
const personal = r => require.ensure([], () => r(require('@/views/work/Personal.vue')), 'personal') // 个人中心
// power-权限
const dept = r => require.ensure([], () => r(require('@/views/power/Dept.vue')), 'dept') // 机构
const menu = r => require.ensure([], () => r(require('@/views/power/Menu.vue')), 'menu') // 菜单
const roles = r => require.ensure([], () => r(require('@/views/power/Roles.vue')), 'roles') // 角色
const users = r => require.ensure([], () => r(require('@/views/power/Users.vue')), 'users') // 用户
// app-应用
const one = r => require.ensure([], () => r(require('@/views/app/AppOne.vue')), 'one') // 机构
const two = r => require.ensure([], () => r(require('@/views/app/AppTwo.vue')), 'two') // 菜单
const three = r => require.ensure([], () => r(require('@/views/app/AppThree.vue')), 'three') // 菜单
const four = r => require.ensure([], () => r(require('@/views/app/AppFour.vue')), 'four') // 菜单
const five = r => require.ensure([], () => r(require('@/views/app/AppFive.vue')), 'five') // 菜单
const six = r => require.ensure([], () => r(require('@/views/app/AppSix.vue')), 'six') // 菜单
const seven = r => require.ensure([], () => r(require('@/views/app/AppSeven.vue')), 'seven') // 菜单
// monitor-监控
const baidu = r => require.ensure([], () => r(require('@/views/monitor/Baidu.vue')), 'baidu') // 机构
const perf = r => require.ensure([], () => r(require('@/views/monitor/Perf.vue')), 'perf') // 菜单
// page-页面
const content = r => require.ensure([], () => r(require('@/views/page/content/Index.vue')), 'content') // 内容

let ansycRoutes = new Map()

ansycRoutes.set("work", work) // 工作台
ansycRoutes.set("personal", personal) // 个人中心
// power-权限
ansycRoutes.set("dept", dept) // 机构
ansycRoutes.set("menu", menu) // 菜单
ansycRoutes.set("roles", roles) // 角色
ansycRoutes.set("users", users) // 用户
// app-应用
ansycRoutes.set("one", one)
ansycRoutes.set("two", two)
ansycRoutes.set("three", three)
ansycRoutes.set("four", four)
ansycRoutes.set("five", five)
ansycRoutes.set("six", six)
ansycRoutes.set("seven", seven)
// monitor-监控
ansycRoutes.set("baidu", baidu)
ansycRoutes.set("perf", perf)
// page-页面
ansycRoutes.set("content", content)

export {
    ansycRoutes
}