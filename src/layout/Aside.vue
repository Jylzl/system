<!--
 * @description: 侧边导航栏
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-09 20:22:56
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 08:55:50
 -->
<template>
	<div class="p-aside">
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:collapse-transition="false"
				:default-active="$route.path"
				class="el-menu-vertical-demo"
				:router="true"
				:unique-opened="true"
				:collapse="isCollapse"
			>
				<template v-for="item in sonRouter">
					<template v-if="(item.meta) && !(item.meta.hidden)">
						<!-- 第一级 -->
						<template v-if="item.meta.leaf || !(item.children)">
							<el-menu-item :index="item.redirect || item.path" :key="item.redirect">
								<i :class="item.meta.iconCls"></i>
								<span class="collapse-font" slot="title">{{item.meta.title}}</span>
							</el-menu-item>
						</template>
						<el-submenu v-else :index="item.path" :key="item.path">
							<!-- 第二级 -->
							<template slot="title">
								<i :class="item.meta.iconCls"></i>
								<span class="collapse-font" slot="title">{{item.meta.title}}</span>
							</template>
							<template v-for="child in item.children">
								<template v-if="(child.meta) && !(child.meta.hidden)">
									<!-- 第三级 -->
									<el-menu-item
										v-if="child.meta.leaf  || !(child.children)"
										:index="child.redirect || child.path"
										:key="child.path"
									>{{child.meta.title}}</el-menu-item>
									<el-submenu v-else :index="child.path" class="child-padding" :key="child.path">
										<template slot="title">
											<span class="collapse-font">{{child.meta.title}}</span>
										</template>
										<template v-for="child2 in child.children">
											<template v-if="(child2.meta) && !(child2.meta.hidden)">
												<!-- 第四级 -->
												<el-menu-item
													v-if="child2.meta.leaf  || !(child2.children)"
													:index="child2.redirect || child2.path"
													:key="child2.path"
												>{{child2.meta.title}}</el-menu-item>
												<el-submenu v-else :index="child2.path" class="child-padding" :key="child2.path">
													<template slot="title">
														<span class="collapse-font">{{child2.meta.title}}</span>
													</template>
													<template v-for="child3 in child2.children">
														<template v-if="!(child3.meta) || (child3.meta && !(child3.meta.hidden))">
															<el-menu-item
																:index="child3.redirect || child3.path"
																:key="child3.redirect"
															>{{child3.meta.title}}</el-menu-item>
														</template>
													</template>
												</el-submenu>
											</template>
										</template>
									</el-submenu>
								</template>
							</template>
						</el-submenu>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script>
export default {
	name: "Aside",
	data() {
		return {};
	},
	computed: {
		routers() {
			return this.$store.getters.getRoutes;
		},
		isCollapse() {
			return this.$store.getters.getCollapse.isCollapse;
		},
		sonRouter() {
			return this.$store.getters.getLeftRouters;
			// return this.routers.find(item => {
			// 	return (item.name = this.$route.name);
			// }).children;
		},
	},
	mounted() {
		// console.log(this.$router);
		// console.log(this.$route);
		// console.log(this.sonRouter);
	},
	methods: {},
};
</script>
<style>
.p-aside .el-menu {
	height: 100%;
}

.p-aside .collapse-font,
.p-aside .el-menu-item {
	font-size: 16px;
}

.p-aside .el-submenu-iconfont {
	font-size: 22px !important;
	margin-right: 15px !important;
}
</style>

<style scoped>
.p-aside {
	height: 100%;
}

.aside-menu {
	height: 100%;
}

.el-submenu-iconfont {
	vertical-align: middle;
	margin-right: 8px;
	width: 24px;
	text-align: center;
	font-size: 18px;
}
</style>