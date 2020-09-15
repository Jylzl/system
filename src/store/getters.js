/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:45
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-15 15:59:19
 */

const getters = {
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	getUser: state => state.power.user,
	getRoutes: state => state.power.routes,
	getLeftRouters: state => state.power.leftRouters,
	getCollapse: state => state.system.collapse,
}
export default getters