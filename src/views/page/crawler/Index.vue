<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-12 17:47:54
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-04 11:03:48
-->
<template>
	<el-main class="h100">
		<div class="right-top">
			<div class="right-top-left"></div>
			<div class="right-top-right">
				<el-button
					type="primary"
					icon="el-icon-aim"
					size="mini"
					@click="crawlerObj"
					:loading="loading"
				>{{loading?'采集中':'开始采集'}}</el-button>
			</div>
		</div>
		<div class="right-table-100" v-loading="tableLoading">
			<el-scrollbar wrap-class="scrollbar-wrapper">
				<div class="table-box">
					<el-table :data="list" stripe style="width: 100%;height:100%;" size="small">
						<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
						<el-table-column prop="title" label="标题" align="left"></el-table-column>
						<el-table-column prop="href" label="链接" align="left"></el-table-column>
						<el-table-column prop="date" label="发布时间" align="left"></el-table-column>
						<el-table-column label="操作" width="160" align="center">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" icon="el-icon-edit" title="编辑" circle></el-button>
								<el-button size="mini" type="danger" icon="el-icon-delete" title="删除" circle></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-scrollbar>
		</div>
		<div class="right-bottom">
			<div></div>
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
	</el-main>
</template>

<script>
import { getObj, crawlerObj } from "@/api/page/crawler";
export default {
	data() {
		return {
			loading: false,
			tableLoading: false,
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			list: [],
			timer: null,
		};
	},
	created() {
		this.getObj();
	},
	methods: {
		crawlerObj() {
			this.loading = true;
			this.timer = setInterval(() => {
				this.getObj();
			}, 1000);
			crawlerObj()
				.then((result) => {
					console.log(result);
					this.loading = false;
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
		},
		getObj() {
			this.tableLoading = true;
			getObj({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			})
				.then((res) => {
					console.log(res);
					this.tableLoading = false;
					this.list = res.data.rows;
					this.page.total = res.data.count;
					clearTimeout(this.timer);
				})
				.catch((err) => {
					this.tableLoading = false;
					clearTimeout(this.timer);
					console.log(err);
				});
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getObj(); //获取角色列表
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getObj(); //获取角色列表
		},
	},
};
</script>