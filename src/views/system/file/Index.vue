<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 17:01:50
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-form :inline="true" :model="searchForm" size="mini" class="demo-form-inline">
						<el-form-item label="文件名">
							<el-input v-model="searchForm.new_name" placeholder="文件名" clearable></el-input>
						</el-form-item>
						<el-form-item label="创建时间">
							<el-date-picker
								v-model="searchForm.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getList">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-upload" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="folder" label="空间" width="120" align="center"></el-table-column>
							<el-table-column prop="new_name" label="文件名"></el-table-column>
							<el-table-column prop="name" label="原文件名"></el-table-column>
							<el-table-column prop="extname" label="扩展名" width="120" align="center"></el-table-column>
							<el-table-column prop="mime_type" label="文件类型" width="160" align="center"></el-table-column>
							<el-table-column prop="size" label="文件大小" width="120" align="center"></el-table-column>
							<el-table-column prop="created_at" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										icon="el-icon-download"
										title="下载"
										@click="down(scope.row.id)"
										circle
									></el-button>
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
		<!-- 修改表单弹窗 -->
		<el-dialog
			:title="editDialog.title"
			:visible.sync="editDialog.visible"
			:top="editDialog.top"
			:width="editDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<el-form :model="editForm" ref="editForm" label-width="100px" size="medium" label-suffix=":">
				<el-row :gutter="20">
					<el-col :span="editDialog.span">
						<el-form-item label="附件上传">
							<el-upload
								class="upload-demo"
								:action="action"
								:headers="headers"
								name="fields"
								:data="{folder:'system'}"
								:with-credentials="true"
								multiple
								:limit="3"
								:accept="accept"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								:on-success="onSuccess"
								:on-exceed="handleExceed"
								:file-list="fileList"
								:auto-upload="false"
								ref="upload"
							>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">上传同步至文件服务器，大小不超过500mb</div>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('editForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>

<script>
import { getList, delObj, downObj } from "@/api/system/file";
import { getToken, csrfToken } from "@/utils/auth";
export default {
	components: {},
	data() {
		return {
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			tableLoading: false,
			tableData: [],
			editDialog: {
				top: "15vh",
				width: "600px",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			editForm: {
				type: null,
				name: "",
				value_type: "string",
				description: "",
				remarks: "",
			},
			fileList: [],
			searchForm: {
				new_name: "",
				time: [],
			},
		};
	},
	computed: {
		action() {
			return process.env.VUE_APP_SERVER_API + "/api/file";
		},
		headers() {
			return {
				authorization: `Bearer ${getToken()}`,
				"x-csrf-token": csrfToken(),
			};
		},
		accept() {
			return "image/*,application/*,text/*,audio/*";
		},
	},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		getList() {
			getList({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				new_name: this.searchForm.new_name,
				startTime:
					this.searchForm.time != null &&
					this.searchForm.time.length == 2
						? this.searchForm.time[0]
						: "",
				endTime:
					this.searchForm.time != null &&
					this.searchForm.time.length == 2
						? this.searchForm.time[1]
						: "",
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		add() {
			this.editForm = {
				type: this.type,
				name: "",
				value_type: "string",
				description: "",
				remarks: "",
			};
			this.editDialog.type = "add";
			this.editDialog.title = "新增";
			this.editDialog.visible = true;
		},
		down(id) {
			console.log("down");
			console.log(id);
			downObj(id).then((res) => {
				console.log(res);
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
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.editDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs.upload.submit();
		},
		beforeClose(done) {
			done();
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getDict();
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getDict();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${
					files.length
				} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			);
		},
		// eslint-disable-next-line no-unused-vars
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		// eslint-disable-next-line no-unused-vars
		onSuccess(response, file, fileList) {
			this.editDialog.visible = false;
			this.getList();
			this.$message.success("上传成功");
		},
	},
};
</script>

<style scoped>
.right-top-left {
	height: 28px;
	line-height: 28px;
	padding: 6px 0;
}

.demo-form-inline .el-form-item {
	margin-bottom: 0;
}
</style>