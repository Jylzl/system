<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-21 10:06:41
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left"></div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-upload" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="name" label="网站名称" width="220" align="center"></el-table-column>
							<el-table-column prop="siteId" label="存储网站ID" align="center"></el-table-column>
							<el-table-column prop="crawlerSiteUrl" label="采集网站链接"></el-table-column>
							<el-table-column prop="crawlerSiteName" label="采集网站名称" align="center"></el-table-column>
							<el-table-column prop="desc" label="备注信息"></el-table-column>
							<el-table-column prop="createdAt" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										icon="el-icon-edit"
										title="编辑"
										@click="update(scope.row)"
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
			<el-form
				:model="editForm"
				:rules="editFormRules"
				ref="editForm"
				label-width="120px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="editDialog.span">
						<el-form-item label="站点名称" prop="name">
							<el-input placeholder="请输入站点名称" v-model="editForm.name" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="存储网站ID" prop="siteId">
							<el-input placeholder="请输入存储网站ID" v-model="editForm.siteId" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="采集网站链接" prop="crawlerSiteUrl">
							<el-input placeholder="请输入采集网站链接" v-model="editForm.crawlerSiteUrl">
								<el-button slot="append" icon="el-icon-magic-stick" @click="checkObj"></el-button>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="采集网站名称" prop="crawlerSiteName">
							<el-input v-model="editForm.crawlerSiteName" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="备注信息">
							<el-input v-model="editForm.desc" maxlength="100"></el-input>
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
import {
	getList,
	addObj,
	delObj,
	putObj,
	checkObj,
} from "@/api/page/crawlerSite";
import va from "@/rules/index.js";

export default {
	components: {},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		return {
			socialType: [],
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
				crawlerSiteName: "",
				crawlerSiteUrl: "",
				siteId: "",
				name: "",
				desc: "",
			},
			searchForm: {
				type: "",
				description: "",
			},
			// 表单验证规则
			editFormRules: {
				crawlerSiteUrl: [r_required],
				crawlerSiteName: [r_required],
				siteId: [r_required],
				name: [r_required],
			},
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		getList() {
			getList({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				description: this.searchForm.description,
				type: this.searchForm.type,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		add() {
			this.editForm = {
				name: "",
				crawlerSiteName: "",
				crawlerSiteUrl: "",
				siteId: "",
				desc: "",
			};
			this.editDialog.type = "add";
			this.editDialog.title = "新增";
			this.editDialog.visible = true;
		},
		update(row) {
			this.editForm = row;
			this.editDialog.type = "update";
			this.editDialog.title = "修改";
			this.editDialog.visible = true;
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
			this.getList();
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getList();
		},
		checkObj() {
			if (this.editForm.crawlerSiteUrl) {
				checkObj({
					url: this.editForm.crawlerSiteUrl,
				}).then((res) => {
					console.log(res);
					this.editForm.crawlerSiteName = res.data.title;
				});
			}
		},
	},
};
</script>