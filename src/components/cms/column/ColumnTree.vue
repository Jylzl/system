<template>
	<div class="h100">
		<div class="left-top">
			<el-button type="text" icon="el-icon-menu" @click="getColumnTree(false, -1);">顶级栏目</el-button>
			<el-button type="text" icon="el-icon-refresh" @click="getColumnTree(false,nowColumnID)">刷新</el-button>
		</div>
		<div class="left-center" v-loading="treeLoading">
			<el-scrollbar wrap-class="scrollbar-wrapper">
				<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span v-if="edit">
							<el-button
								type="text"
								size="mini"
								@click.stop.prevent="() => append(data)"
								icon="el-icon-caret-top"
							></el-button>
							<el-button
								type="text"
								size="mini"
								@click.stop.prevent="() => remove(node, data)"
								icon="el-icon-caret-bottom"
							></el-button>
						</span>
					</span>
				</el-tree>
			</el-scrollbar>
		</div>
	</div>
</template>
<script>
export default {
	name: "ColumnTree",
	props: {
		edit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			nowColumnID: -1,
			treeLoading: false,
			data: [
				{
					label: "一级 1",
					id: 1,
					children: [
						{
							label: "二级 1-1",
							id: 11,
							children: [
								{
									label: "三级 1-1-1",
									id: 111,
								},
							],
						},
					],
				},
				{
					label: "一级 2",
					id: 2,
					children: [
						{
							label: "二级 2-1",
							id: 21,
							children: [
								{
									label: "三级 2-1-1",
									id: 211,
								},
							],
						},
						{
							label: "二级 2-2",
							id: 22,
							children: [
								{
									label: "三级 2-2-1",
									id: 221,
								},
							],
						},
					],
				},
				{
					label: "一级 3",
					id: 3,
					children: [
						{
							label: "二级 3-1",
							id: 31,
							children: [
								{
									label: "三级 3-1-1",
									id: 311,
								},
							],
						},
						{
							label: "二级 3-2",
							id: 32,
							children: [
								{
									label: "三级 3-2-1",
									id: 321,
								},
							],
						},
					],
				},
			],
			defaultProps: {
				children: "children",
				label: "label",
			},
		};
	},
	methods: {
		handleNodeClick(data) {
			this.$emit("columnClick", data.id);
		},
		getColumnTree(type, id) {
			console.log(type);
			console.log(id);
		},
		// eslint-disable-next-line no-unused-vars
		append(data) {
			this.$message("上移");
		},
		// eslint-disable-next-line no-unused-vars
		remove(node, data) {
			this.$message("下移");
		},
	},
};
</script>

<style scoped>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}
</style>