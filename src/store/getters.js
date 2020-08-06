/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 15:54:05
 */
/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-20 23:02:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-04-30 15:36:23
 */

const getters = {
	getUser: state => state.power.user,
	getRoutes: state => state.power.routes,
	getLeftRouters: state => state.power.leftRouters,
	getCollapse: state => state.system.collapse,
}
export default getters