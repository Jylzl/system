/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-25 17:34:15
 */

const getters = {
	getTopRouters: state => state.power.topNav,
	getLeftRouters: state => state.power.leftNav,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	getUser: state => state.power.user,
	getRoutes: state => state.power.routes,
	getCollapse: state => state.system.collapse,
}
export default getters