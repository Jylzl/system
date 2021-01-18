/**
 * @description: 页面组件声明，需要异步
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:44
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 16:47:32
 */
const work = r => require.ensure([], () => r(require('@/views/work/Work.vue')), 'work') // 工作台
const personal = r => require.ensure([], () => r(require('@/views/work/Personal.vue')), 'personal') // 个人中心
// power-权限
const dept = r => require.ensure([], () => r(require('@/views/power/Dept.vue')), 'dept') // 机构
const menu = r => require.ensure([], () => r(require('@/views/power/Menu.vue')), 'menu') // 菜单
const role = r => require.ensure([], () => r(require('@/views/power/Role.vue')), 'role') // 角色
const user = r => require.ensure([], () => r(require('@/views/power/User.vue')), 'user') // 用户
const area = r => require.ensure([], () => r(require('@/views/power/Area.vue')), 'area') // 区域
// system-系统
const dict = r => require.ensure([], () => r(require('@/views/system/dict/Index.vue')), 'dict') // 机构
const file = r => require.ensure([], () => r(require('@/views/system/file/Index.vue')), 'file') // 文件
const secretkey = r => require.ensure([], () => r(require('@/views/system/secretkey/Index.vue')), 'secretkey') // 密钥
const log = r => require.ensure([], () => r(require('@/views/system/log/Index.vue')), 'log') // 日志
// app-应用
const one = r => require.ensure([], () => r(require('@/views/app/AppOne.vue')), 'one') // 机构
const two = r => require.ensure([], () => r(require('@/views/app/AppTwo.vue')), 'two') // 菜单
const three = r => require.ensure([], () => r(require('@/views/app/AppThree.vue')), 'three') // 菜单
const four = r => require.ensure([], () => r(require('@/views/app/AppFour.vue')), 'four') // 菜单
const five = r => require.ensure([], () => r(require('@/views/app/AppFive.vue')), 'five') // 菜单
const six = r => require.ensure([], () => r(require('@/views/app/AppSix.vue')), 'six') // 菜单
const seven = r => require.ensure([], () => r(require('@/views/app/AppSeven.vue')), 'seven') // 菜单
const eight = r => require.ensure([], () => r(require('@/views/app/AppEight.vue')), 'eight') // 右键
const nine = r => require.ensure([], () => r(require('@/views/app/AppNine/Index.vue')), 'nine') // 邮箱
// monitor-监控
const baidu = r => require.ensure([], () => r(require('@/views/monitor/Baidu.vue')), 'baidu') // 机构
const perf = r => require.ensure([], () => r(require('@/views/monitor/Perf.vue')), 'perf') // 菜单
// page-页面
const contentList = r => require.ensure([], () => r(require('@/views/page/content/Index.vue')), 'contentList') // 内容列表
const contentDetails = r => require.ensure([], () => r(require('@/views/page/content/Details.vue')), 'contentDetails') // 内容详情
const columnList = r => require.ensure([], () => r(require('@/views/page/column/Index.vue')), 'columnList') // 栏目列表

const crawler = r => require.ensure([], () => r(require('@/views/page/crawler/Index.vue')), 'crawler') // 采集列表
const crawlerSite = r => require.ensure([], () => r(require('@/views/page/crawler/site/Index.vue')), 'crawlerSite') // 采集列表
const crawlerColumn = r => require.ensure([], () => r(require('@/views/page/crawler/column/Index.vue')), 'crawlerColumn') // 采集列表

let routes = new Map()

routes.set("work", work) // 工作台
routes.set("personal", personal) // 个人中心
// power-权限
routes.set("dept", dept) // 机构
routes.set("menu", menu) // 菜单
routes.set("role", role) // 角色
routes.set("user", user) // 用户
routes.set("area", area) // 区域
// power-系统
routes.set("dict", dict) // 字典
routes.set("file", file) // 文件
routes.set("secretkey", secretkey) // 密钥
routes.set("log", log) // 日志
// app-应用
routes.set("one", one)
routes.set("two", two)
routes.set("three", three)
routes.set("four", four)
routes.set("five", five)
routes.set("six", six)
routes.set("seven", seven)
routes.set("eight", eight)
routes.set("nine", nine)
// monitor-监控
routes.set("baidu", baidu)
routes.set("perf", perf)
// page-页面
routes.set("contentList", contentList)
routes.set("contentDetails", contentDetails)
routes.set("columnList", columnList)
routes.set("crawler", crawler)
routes.set("crawlerSite", crawlerSite)
routes.set("crawlerColumn", crawlerColumn)

export {
    routes
}