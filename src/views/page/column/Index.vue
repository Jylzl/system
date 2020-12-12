<!--
 * @description: 栏目管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-12 17:41:01
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
						<el-radio-button label="1">基本信息</el-radio-button>
						<el-radio-button label="2">扩展配置</el-radio-button>
						<el-radio-button label="3">SEO信息</el-radio-button>
					</el-radio-group>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-camera" size="mini">预览</el-button>
					<el-button type="primary" icon="el-icon-view" size="mini">浏览</el-button>
					<el-button type="primary" icon="el-icon-delete" size="mini">删除</el-button>
					<el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
				</div>
			</div>
			<div class="right-table-50">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<List></List>
				</el-scrollbar>
			</div>
		</el-main>
	</el-container>
</template>
<script>
import ColumnTree from "@/components/cms/column/ColumnTree.vue";
import List from "./components/List.vue";
export default {
	name: "columnList",
	components: {
		ColumnTree,
		List,
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