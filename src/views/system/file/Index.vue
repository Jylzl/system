<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-22 18:23:54
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">1</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-upload" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="name" label="原名称"></el-table-column>
							<el-table-column prop="extname" label="扩展名" width="120" align="center"></el-table-column>
							<el-table-column prop="mime_type" label="文件类型" width="120" align="center"></el-table-column>
							<el-table-column prop="size" label="文件大小" width="120" align="center"></el-table-column>
							<el-table-column prop="url" label="资源地址"></el-table-column>
							<el-table-column prop="created_at" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										icon="el-icon-download"
										title="下载"
										@click="down(scope.row)"
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
								name="file"
								:with-credentials="true"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								multiple
								:limit="3"
								:on-exceed="handleExceed"
								:file-list="fileList"
							>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
import { getList, addObj, putObj, delObj } from "@/api/system/file";
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
			fileList: [
				{
					name: "food.jpeg",
					url:
						"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
				},
				{
					name: "food2.jpeg",
					url:
						"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
				},
			],
		};
	},
	computed: {
		action() {
			return process.env.VUE_APP_SERVER_API + "/api/upload";
		},
		headers() {
			return {
				authorization: `Bearer ${getToken()}`,
				"x-csrf-token": csrfToken(),
			};
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
			}).then((res) => {
				console.log(res);
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
		down(row) {
			console.log("down");
			console.log(row);
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
						this.$message.success(`成功删除${res.data}条数据`);
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
			this.$refs["editForm"].validate((valid) => {
				if (valid) {
					if (this.editDialog.type == "add") {
						addObj(this.editForm).then(() => {
							this.editDialog.visible = false;
							this.getList();
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.editForm).then(() => {
							this.editDialog.visible = false;
							this.getList();
							this.$message.success("修改成功");
						});
					}
				} else {
					return false;
				}
			});
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
	},
};
</script>