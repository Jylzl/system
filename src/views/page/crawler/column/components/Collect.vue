<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-19 16:31:18
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-28 18:17:44
-->
<template>
	<div class="dialog-box h100">
		<div class="box-top">
			<div class="box-top-left">
				<el-button
					type="primary"
					icon="el-icon-circle-check"
					size="small"
					@click="saveCollect"
					:disabled="page.total != 0"
				>保存采集任务</el-button>
				<el-button
					type="primary"
					icon="el-icon-refresh"
					size="small"
					@click="updateCollect"
					:disabled="page.total == 0"
				>更新采集任务</el-button>
				<el-button
					type="success"
					icon="el-icon-video-play"
					size="small"
					@click="startCollect"
					:disabled="page.total == 0"
				>开始采集任务</el-button>
				<el-button
					type="warning"
					icon="el-icon-video-pause"
					size="small"
					@click="suspendCollect"
					:disabled="page.total == 0"
				>暂停采集任务</el-button>
				<el-button
					type="danger"
					icon="el-icon-circle-close"
					size="small"
					@click="clearCollect"
					:disabled="page.total == 0"
				>清空采集任务</el-button>
			</div>
		</div>
		<div class="box-progress" v-if="total">
			<el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" :color="colors"></el-progress>
		</div>
		<div class="box-center">
			<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="href" label="链接">
					<template slot-scope="scope">
						<el-link :href="scope.row.href" target="_blank" type="primary">{{scope.row.href}}</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" width="100" align="center" :formatter="formatter"></el-table-column>
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
import {
	getList,
	collectObj as collectTaskObj,
	progressObj,
	clearObj,
} from "@/api/page/crawlerTask";
import { collectObj as collectContentObj } from "@/api/page/crawlerContent";
import { getDictItemByType } from "@/api/system/dict";

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
	},
	data() {
		return {
			tableLoading: false,
			id: null,
			collectStateDict: [],
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [5, 10, 15, 20, 50, 100, 200],
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
		this.getDictType("collect_state", "status");
		this.getList();
	},
	mounted() {
		this.progress(this.id);
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	methods: {
		getDictType(dict, key) {
			getDictItemByType(dict).then((res) => {
				this[key + "Dict"] = res.data;
			});
		},
		// 保存采集任务
		saveCollect() {
			collectTaskObj({
				id: this.id,
			}).then((res) => {
				this.total = res.data.total;
				this.progress(this.id);
			});
		},
		// 更新采集任务
		updateCollect() {},
		// 开始采集任务
		startCollect() {
			collectContentObj({ columnId: this.id }).then((res) => {
				console.log(res);
				this.getList();
			});
		},
		// 暂停采集任务
		suspendCollect() {},
		getList() {
			getList({
				columnId: this.id,
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
			});
		},
		// 清除采集任务
		clearCollect() {
			clearObj(this.id).then((res) => {
				if (res.code == 200) {
					this.$message.success(
						`成功清除${res.data.delTaskResult}条任务,${res.data.delContentResult}条内容`
					);
					this.getList();
				}
				console.log(res);
			});
		},
		// 任务保存进度
		progress(columnId) {
			progressObj({
				columnId,
			}).then((res) => {
				console.log(res);

				const percentage =
					this.total > 0
						? parseInt(
								(res.data.count / this.total) * 100
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  )
						: 0;
				this.percentage = percentage;
				if (res.data.status == 1) {
					this.timer = setInterval(() => {
						this.progress(this.id);
					}, 1500);
				} else {
					clearInterval(this.timer);
				}
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
		// 表格
		formatter(row, column) {
			const arr = this[column.property + "Dict"] || [];
			const data = arr.filter((item) => {
				return item.value == row[column.property];
			});
			return data.length > 0 ? data[0].label : row[column.property];
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