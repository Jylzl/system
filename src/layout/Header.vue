<!--
 * @Description: 头部组件
 * @Author: haoran
 * @Date: 2020-04-30 14:53:35
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:46:47
 -->
<template>
	<div class="header-box">
		<div class="header-left">
			<div class="header-logo">os</div>
			<div class="header-menu">
				<el-menu
					:router="true"
					:default-active="topPath"
					mode="horizontal"
					background-color="transparent"
					text-color="#fff"
					active-text-color="#ffd04b"
					@select="menuSelect"
					class="top-nav"
				>
					<template v-for="topRouter in topRouters">
						<el-menu-item
							:index="topRouter.path"
							:route="topRouter"
							v-if="topRouter.meta.hidden == false"
							:key="topRouter.path"
						>{{topRouter.meta.title}}</el-menu-item>
					</template>
				</el-menu>
			</div>
		</div>
		<div class="header-right">
			<div class="siteSearch-form" :class="{'show':show}">
				<el-select v-model="site" placeholder="请选择站点" size="mini" class="site-select mr-20" filterable>
					<el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-popover placement="bottom" width="260" trigger="click">
					<el-select
						ref="siteSearchInput"
						v-model="search"
						:remote-method="querySearch"
						filterable
						default-first-option
						remote
						size="small"
						placeholder="请输入您要查找的内容"
						@change="change"
						@blur="siteSearchShow(false)"
						class="w100"
					>
						<el-option v-for="item in options" :key="item.path" :value="item" :label="item.name" />
					</el-select>
					<el-button type="text" slot="reference">
						<svg width="26" height="26">
							<image xlink:href="@/assets/svg/search.svg" src="svg.png" width="26" height="26" />
						</svg>
					</el-button>
				</el-popover>
			</div>
			<div class="message mr-20">
				<el-button @click="$router.push({	name: 'personal', query: {type: 'news'}})" type="text">
					<el-badge is-dot class="user-name">
						<svg width="26" height="26">
							<image xlink:href="@/assets/svg/news.svg" src="svg.png" width="26" height="26" />
						</svg>
					</el-badge>
				</el-button>
			</div>
			<div class="user-inf">
				<el-dropdown trigger="click">
					<div class="el-dropdown-link">
						<el-avatar class="user-header-img" :size="32" :src="user.powUserInf.imageUrl">A</el-avatar>
						<span class="user-name">{{user.powUserInf.realName}}</span>
						<i class="el-icon-caret-bottom"></i>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<el-link :underline="false" @click="$router.push({name:'personal'})">个人主页</el-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button type="text" @click="loginOut">切换用户</el-button>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import Fuse from "fuse.js";
import path from "path";
export default {
	data() {
		return {
			search: "",
			options: [],
			searchPool: [],
			show: false,
			fuse: undefined,
			site: "1",
			siteList: [
				{
					value: "1",
					label: "孝感市门户网站",
				},
				{
					value: "2",
					label: "大悟县门户网站",
				},
				{
					value: "3",
					label: "孝南区门户网站",
				},
			],
		};
	},
	watch: {
		searchPool(list) {
			this.initFuse(list);
		},
	},
	computed: {
		topPath() {
			return this.$route.meta.topPath;
		},
		user() {
			return this.$store.getters.getUser;
		},
		topRouters() {
			return this.$store.getters.getTopRouters;
		},
	},
	created() {
		this.$store.dispatch("setLeftRouters", this.$route.meta.topPath);
	},
	mounted() {},
	methods: {
		// eslint-disable-next-line no-unused-vars
		menuSelect(index, indexPath) {
			this.$store.dispatch("setLeftRouters", index);
		},
		//锁屏操作
		clockScreen() {
			this.$confirm("您在进行锁屏操作, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$router.push({
						path: "/lock", //跳转的路径
						query: {
							user: this.userName,
						},
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消",
					});
				});
		},
		//退出登陆
		loginOut() {
			this.$confirm("您在进行退出操作, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$store.dispatch("userLogout").then((res) => {
						if (res.code == this.$code.success) {
							this.successMessage("退出成功");
							this.$router.push({
								name: "login",
							});
						} else {
							this.errorMessage("退出失败");
						}
					});
				})
				.catch(() => {
					this.warningMessage("已取消");
				});
		},
		//站内搜索
		siteSearchShow(type) {
			this.show = type;
			this.$refs.siteSearchInput.focus();
		},
		change(val) {
			this.$router.push(val.path);
			this.search = "";
			this.options = [];
			this.$nextTick(() => {
				this.show = false;
			});
		},
		initFuse(list) {
			this.fuse = new Fuse(list, {
				shouldSort: true,
				threshold: 0.4,
				location: 0,
				distance: 100,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					{
						name: "name",
						weight: 0.7,
					},
					{
						name: "path",
						weight: 0.3,
					},
				],
			});
		},
		generateRoutes(routes, basePath = "/", prefixTitle = []) {
			let res = [];
			for (const router of routes) {
				// 如果路由不显示就跳出循环
				if (router.meta.hidden) {
					continue;
				}
				const data = {
					// eslint-disable-next-line no-undef
					path: path.resolve(basePath, router.path),
					name: [...prefixTitle],
				};
				if (router.meta && router.meta.title) {
					// generate internationalized title
					data.name = [...data.name, router.meta.title];
					if (router.redirect !== "noredirect") {
						// only push the routes with title
						// special case: need to exclude parent router without redirect
						res.push(data);
					}
				}

				// recursive child routes
				if (router.children) {
					const tempRoutes = this.generateRoutes(
						router.children,
						data.path,
						data.name
					);
					if (tempRoutes.length >= 1) {
						res = [...res, ...tempRoutes];
					}
				}
			}
			return res;
		},
		querySearch(query) {
			if (query !== "") {
				this.options = this.fuse.search(query);
			} else {
				this.options = [];
			}
		},
	},
};
</script>

<style  lang="scss" scoped>
.header-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 60px;
}

.header-left,
.header-right {
	display: flex;
	align-items: center;
}

.header-logo {
	box-sizing: border-box;
	width: 64px;
	height: 60px;
	padding: 0 7px;
	text-align: center;
	line-height: 60px;
	font-size: 12px;
	color: #fff;
	background: url(../assets/img/logo.png) no-repeat center center;
	background-size: 72%;
}

.header-menu {
	box-sizing: border-box;
	padding-left: 20px;
}

.user-inf {
	display: flex;
	height: 100%;
	flex-direction: row-reverse;
}

.el-dropdown-link {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 100%;
	align-items: center;
	padding: 0 5px;
	color: #fff;
}

.el-dropdown-link:hover {
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.025);
}

.user-name {
	box-sizing: border-box;
	padding-left: 2px;
	padding-right: 8px;
	line-height: 1;
	color: #ffffff;
}

.user-header-img {
	margin-right: 8px;
}

.siteSearch-form {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-right: 15px;
}

.siteSearch-form button {
	font-size: 26px;
}

.siteSearch-form .siteSearch-input {
	box-sizing: border-box;
	overflow: hidden;
}

.siteSearch-form .siteSearch-input input {
	box-sizing: border-box;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #fff;
	padding: 0 10px;
}

.show {
	.header-search-select {
		display: block;
		width: 210px;
		margin-left: 10px;
	}
}

.site-select {
	display: flex;
	align-items: center;

	/deep/ input {
		border: 1px solid #e6f7f8;
		background: #e6f7f8;
	}
}
</style>