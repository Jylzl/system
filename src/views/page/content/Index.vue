<!--
 * @description: 内容管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-28 09:45:11
 -->
<template>
	<el-container>
		<el-aside width="240px" class="aside-left">
			<ColumnTree @columnClick="columnClick" @columnRefresh="columnClick"></ColumnTree>
		</el-aside>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-radio-group v-model="radio3" size="mini">
						<el-radio-button label="1">内容列表</el-radio-button>
						<el-radio-button label="2">回收站</el-radio-button>
						<el-radio-button label="3">已归档</el-radio-button>
					</el-radio-group>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
				</div>
			</div>
			<div class="right-table-50">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<Content></Content>
				</el-scrollbar>
			</div>
		</el-main>
	</el-container>
</template>
<script>
import ColumnTree from "@/components/cms/column/ColumnTree.vue";
import Content from "./components/Content.vue";
export default {
	name: "contentList",
	components: {
		Content,
		ColumnTree,
	},
	data() {
		return {
			radio3: "1",
		};
	},
	created() {},
	mounted() {},
	filters: {},
	computed: {},
	methods: {
		columnClick(id) {
			console.log("treeclick");
			console.log(id);
		},
	},
};
</script>