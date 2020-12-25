<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 10:03:40
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 14:08:52
-->
<template>
	<el-container>
		<el-aside width="240px" class="aside-left">
			<div class="left-top">
				<el-button type="text" icon="el-icon-message">我的信箱</el-button>
				<el-button type="text" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="left-center" v-loading="treeLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<el-menu
						default-active="2"
						class="el-menu-vertical-demo"
						@open="handleOpen"
						@close="handleClose"
						@select="handleSelect"
					>
						<el-menu-item index="1">
							<i class="el-icon-folder"></i>
							<span slot="title">收件箱</span>
						</el-menu-item>
						<el-menu-item index="2">
							<i class="el-icon-folder-add"></i>
							<span slot="title">草稿箱</span>
						</el-menu-item>
						<el-menu-item index="3">
							<i class="el-icon-folder-checked"></i>
							<span slot="title">已发送</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-folder-delete"></i>
							<span slot="title">已删除</span>
						</el-menu-item>
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<component :is="component"></component>
	</el-container>
</template>


<script>
import List from "./components/List.vue";
import Add from "./components/Add.vue";
export default {
	components: {
		List,
		Add,
	},
	data() {
		return {
			treeLoading: false,
			component: "Add",
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			this.component = "List";
			console.log(key, keyPath);
		},
		handleOpen(key, keyPath) {
			this.component = "List";
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			this.component = "List";
			console.log(key, keyPath);
		},
	},
};
</script>
