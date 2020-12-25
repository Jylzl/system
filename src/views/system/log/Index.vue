<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 09:48:53
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-radio-group v-model="searchForm.type" size="mini" @change="getList">
						<el-radio-button v-for="item in type" :label="item.value" :key="item.id">{{item.label}}</el-radio-button>
					</el-radio-group>
				</div>
				<div class="right-top-right">
					<el-form :inline="true" :model="searchForm" size="mini" class="demo-form-inline">
						<el-form-item label="请求类型">
							<el-select v-model="searchForm.request_type" placeholder="请选择" class="w100" clearable>
								<el-option
									v-for="item in requestType"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="标题">
							<el-input v-model="searchForm.title" placeholder="描述" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getList">查询</el-button>
						</el-form-item>
					</el-form>
					<!-- <el-button type="primary" icon="el-icon-upload" size="mini" @click="add">添加</el-button> -->
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="title" label="标题"></el-table-column>
							<el-table-column prop="ip" label="IP地址" width="200" align="center"></el-table-column>
							<el-table-column prop="user_name" label="操作人" width="200" align="center"></el-table-column>
							<el-table-column prop="request_type" label="请求类型" width="120" align="center"></el-table-column>
							<el-table-column prop="time" label="请求时间(ms)" width="200" align="center"></el-table-column>
							<el-table-column prop="created_at" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="80" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="danger"
										icon="el-icon-delete"
										title="删除"
										@click="del(scope.row.id)"
										circle
									></el-button>
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
	</el-container>
</template>

<script>
import { getList, delObj } from "@/api/system/log";
import { getDictItemByType } from "@/api/system/dict";

export default {
	components: {},
	data() {
		return {
			requestType: [],
			type: [
				{ label: "登录日志", value: 1, id: 1 },
				{ label: "操作日志", value: 2, id: 2 },
			],
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			tableLoading: false,
			tableData: [],
			searchForm: {
				type: 1,
				request_type: "",
				title: "",
			},
		};
	},
	computed: {},
	created() {
		this.getDictType();
		this.getList();
	},
	mounted() {},
	methods: {
		getDictType() {
			getDictItemByType("request_type").then((res) => {
				this.requestType = res.data;
			});
		},
		getList() {
			getList({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		del(id) {
			this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.tableLoading = true;
					delObj(id).then((res) => {
						this.tableLoading = false;
						this.getList();
						if (res.code == 200) {
							this.$message.success(`成功删除当前数据`);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		beforeClose(done) {
			done();
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
.right-top-right {
	height: 28px;
	line-height: 28px;
	padding: 6px 0;
}

.demo-form-inline .el-form-item {
	margin-bottom: 0;
}
</style>