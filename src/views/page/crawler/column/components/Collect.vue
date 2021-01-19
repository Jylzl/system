<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-19 16:31:18
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 18:04:57
-->
<template>
	<div class="dialog-box h100">
		<div class="box-top">
			<el-button type="primary" icon="el-icon-circle-check" size="small">保存采集任务</el-button>
		</div>
		<div class="box-progress">
			<el-progress :text-inside="true" :stroke-width="20" :percentage="0"></el-progress>
		</div>
		<div class="box-center">
			<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="href" label="链接"></el-table-column>
				<el-table-column prop="date" label="日期" width="200" align="center"></el-table-column>
			</el-table>
		</div>
		<div class="box-bottom">
			<div class="list-paging">
				<el-pagination
					@current-change="handleCurrentChange"
					:total="page.total"
					:page-size="page.pageSize"
					layout="prev, pager, next"
					background
				></el-pagination>
			</div>
		</div>
	</div>
</template>


<script>
import { collectObj } from "@/api/page/crawlerColumn";
export default {
	name: "Collect",
	props: {
		columnId: {
			type: Number,
		},
	},
	data() {
		return {
			tableLoading: false,
			id: null,
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 0,
			},
			tableData: [],
		};
	},
	created() {
		this.id = this.columnId;
		this.getList(this.dictId);
	},
	methods: {
		getList() {
			this.tableLoading = true;
			collectObj({
				id: this.id,
				currentPage: this.page.currentPage,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.page.pageSize = res.data.size;
				this.tableLoading = false;
			});
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getList();
		},
	},
};
</script>

<style scoped>
.box-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}
.box-progress {
	margin-bottom: 10px;
}
.box-bottom {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.z-index-3002 {
	z-index: 3002;
}
</style>