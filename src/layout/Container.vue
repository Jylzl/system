<!--
 * @Description: 页面框架布局容器
 * @Author: lihaoran<94648929@qq.com>
 * @Date: 2020-04-30 14:53:22
 * @LastAuthor: lizlong
 * @lastTime: 2020-06-10 17:14:44
 -->
<template>
	<el-container class="h100">
		<el-header height="60px" class="p-header">
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="220px">
				<Aside></Aside>
			</el-aside>
			<el-main class="p-main">
				<Main></Main>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
// @ is an alias to /src
import Header from "@/layout/Header.vue";
import Aside from "@/layout/Aside.vue";
import Main from "@/layout/Main.vue";
export default {
	name: "Layout",
	components: {
		Header,
		Aside,
		Main
	},
	data() {
		return {};
	},
	computed: {},
	methods: {}
};
</script>
<style>
.p-header {
	color: #ffffff;
	background: #165abb url(../assets/img/header_bg.png) no-repeat center right;
}

.p-main {
	background-color: #f7f7f9;
	color: #333;
	padding-top: 0;
	height: 100%;
}
</style>