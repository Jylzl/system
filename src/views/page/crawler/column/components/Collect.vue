<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-19 16:31:18
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 18:51:52
-->
<template>
	<div class="dialog-box h100">
		<div class="box-top">
			<el-button type="primary" icon="el-icon-circle-check" size="small" @click="collectObj">保存采集任务</el-button>
		</div>
		<div class="box-progress">
			<el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" :color="colors"></el-progress>
		</div>
		<div class="box-center">
			<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="href" label="链接"></el-table-column>
				<el-table-column prop="status" label="状态" width="60" align="center"></el-table-column>
				<el-table-column prop="date" label="日期" width="200" align="center"></el-table-column>
			</el-table>
		</div>
		<div class="box-bottom">
			<div class="list-paging">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.currentPage"
					:page-sizes="page.pageSizes"
					:page-size="page.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="page.total"
					background
				></el-pagination>
			</div>
		</div>
	</div>
</template>


<script>
import { collectObj } from "@/api/page/crawlerColumn";
import {
	getList,
	collectObj as collectTaskObj,
	progressObj,
} from "@/api/page/crawlerTask";

export default {
	name: "Collect",
	props: {
		columnId: {
			type: Number,
		},
		pageSize: {
			type: Number,
			default: 10,
		},
		startPage: {
			type: Number,
		},
		endPage: {
			type: Number,
		},
		pageCount: {
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
			timer: null,
			percentage: 0,
			colors: [
				{ color: "#409EFF", percentage: 20 },
				{ color: "#409EFF", percentage: 40 },
				{ color: "#409EFF", percentage: 60 },
				{ color: "#409EFF", percentage: 80 },
				{ color: "#67C23A", percentage: 100 },
			],
			total: 0,
		};
	},
	created() {
		this.id = this.columnId;
		this.page.pageSize = this.pageSize;
		this.getList();
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	methods: {
		// 保存采集任务
		collectObj() {
			// this.tableLoading = true;
			collectObj({
				id: this.id,
			}).then((res) => {
				this.total = res.data.total;
				console.log(res);
			});
			this.timer = setInterval(() => {
				this.getList();
			}, 500);
		},
		getList() {
			// this.tableLoading = true;
			getList({
				id: this.id,
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				const percentage = res.data.count
					? parseInt(
							(res.data.count /
								((this.endPage - this.startPage + 2) *
									this.pageSize)) *
								100
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  )
					: 0;
				this.percentage = percentage;
				if (this.total != 0 && res.data.count >= this.total) {
					clearInterval(this.timer);
				}
			});
		},
		progressObj(num) {
			progressObj({
				id: this.id,
				num,
			}).then((res) => {
				this.percentage = res.data;
				if (num == 0) {
					this.timer = setInterval(() => {
						this.progressObj(this.percentage);
					}, 500);
				}
				if (res.data >= 100) {
					clearInterval(this.timer);
				}
			});
		},
		collectTaskObj(id) {
			collectTaskObj({
				id,
			}).then((res) => {
				console.log(res);
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