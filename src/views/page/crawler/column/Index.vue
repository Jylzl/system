<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2021-02-01 09:22:08
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-form :inline="true" :model="searchForm" size="small" class="top-form-inline">
						<el-form-item>
							<el-select
								v-model="searchForm.siteId"
								placeholder="请选择站点"
								class="w100"
								@change="getSiteList"
								clearable
							>
								<el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
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
							<el-table-column prop="name" label="栏目名称" width="120" align="center"></el-table-column>
							<el-table-column prop="columnId" label="存储栏目ID" width="120" align="center"></el-table-column>
							<el-table-column prop="crawlerColumnUrl" label="采集栏目网址" align="center">
								<template slot-scope="scope">
									<el-link
										:href="scope.row.crawlerColumnUrl"
										target="_blank"
										:title="scope.row.crawlerColumnName"
									>{{scope.row.crawlerColumnUrl}}</el-link>
								</template>
							</el-table-column>
							<el-table-column prop="crawlerColumnName" label="采集栏目名称" align="center"></el-table-column>
							<el-table-column prop="desc" label="备注信息"></el-table-column>
							<el-table-column prop="status" label="状态" width="100" align="center" :formatter="formatter"></el-table-column>
							<el-table-column prop="crawlerPageCount" label="页数" width="100" align="center"></el-table-column>
							<el-table-column prop="crawlerPageTotal" label="任务量" width="100" align="center"></el-table-column>
							<el-table-column prop="collectStartAt" label="任务开始时间" width="180" align="center"></el-table-column>
							<el-table-column prop="collectEndAt" label="任务结束时间" width="180" align="center"></el-table-column>
							<el-table-column prop="updatedAt" label="最后修改时间" width="180" align="center"></el-table-column>
							<el-table-column label="操作" width="180" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										icon="el-icon-refresh"
										title="刷新"
										@click="refresh(scope.row)"
										circle
									></el-button>
									<el-button
										size="mini"
										type="info"
										icon="el-icon-attract"
										title="采集"
										@click="collect(scope.row)"
										circle
									></el-button>
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
						<el-form-item label="所属站点" prop="siteId">
							<el-select v-model="editForm.siteId" placeholder="请选择站点" class="w100" clearable>
								<el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="栏目名称" prop="name">
							<el-input placeholder="请输入栏目名称" v-model="editForm.name" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="栏目ID" prop="columnId">
							<el-input v-model="editForm.columnId" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="备注信息" prop="desc">
							<el-input v-model="editForm.desc" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="采集栏目名称" prop="crawlerColumnName">
							<el-input
								placeholder="请先输入采集栏目链接点击右侧检验"
								v-model="editForm.crawlerColumnName"
								maxlength="100"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="内容模板" prop="templateId">
							<el-select v-model="editForm.templateId" placeholder="请选择内容采集模板" class="w100" clearable>
								<el-option v-for="item in templateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="采集栏目链接" prop="crawlerColumnUrl">
							<el-input placeholder="请输入采集栏目首页链接" v-model="editForm.crawlerColumnUrl">
								<el-button slot="append" icon="el-icon-magic-stick" @click="checkObj"></el-button>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="动态链接" prop="crawlerReUrl">
							<el-input
								placeholder="第二页开始使用动态链接，使用${page}代替页码"
								v-model="editForm.crawlerReUrl"
								maxlength="100"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="栏目总页数" prop="crawlerPageCount">
							<el-input-number
								v-model="editForm.crawlerPageCount"
								controls-position="right"
								:min="1"
								:max="10000"
								class="w100"
							></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="每页条数" prop="crawlerPageSize">
							<el-input-number
								v-model="editForm.crawlerPageSize"
								controls-position="right"
								:min="0"
								:max="10000"
								:step="5"
								class="w100"
							></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="动态开始页码" prop="crawlerStartPage">
							<el-input-number
								v-model="editForm.crawlerStartPage"
								controls-position="right"
								:min="0"
								:max="10000"
								class="w100"
							></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="动态结束页码" prop="crawlerEndPage">
							<el-input-number
								v-model="editForm.crawlerEndPage"
								controls-position="right"
								:min="editForm.crawlerStartPage"
								:max="editForm.crawlerPageCount"
								class="w100"
							></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="列表元素" prop="crawlerItem">
							<el-input v-model="editForm.crawlerItem" maxlength="128"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="标题元素" prop="crawlerItemTitle">
							<el-input v-model="editForm.crawlerItemTitle" maxlength="128"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="链接元素" prop="crawlerItemUrl">
							<el-input v-model="editForm.crawlerItemUrl" maxlength="128"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="日期元素" prop="crawlerItemTime">
							<el-input v-model="editForm.crawlerItemTime" maxlength="128"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('editForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
		<!-- 字典项弹窗 -->
		<el-dialog
			:title="collectDialog.title"
			:visible.sync="collectDialog.visible"
			:top="collectDialog.top"
			:width="collectDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<Collect
				:columnId="columnId"
				:pageSize="pageSize"
				v-if="collectDialog.visible"
				@refresh="getList"
			></Collect>
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
} from "@/api/page/crawlerColumn";
import { getList as getSiteList } from "@/api/page/crawlerSite";
import { getList as getTemplateList } from "@/api/page/crawlerTemplate";
import { getDictItemByType } from "@/api/system/dict";
import va from "@/rules/index.js";
import Collect from "./components/Collect.vue";

export default {
	components: {
		Collect,
	},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_requiredc = va.required("", "change");
		return {
			columnId: null,
			pageSize: null,
			siteList: [],
			templateList: [],
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [10, 20, 50, 100, 200],
			},
			tableLoading: false,
			tableData: [],
			collectData: [],
			collectDialog: {
				top: "15vh",
				width: "65%",
				type: "add",
				title: "采集",
				visible: false,
				span: 12,
			},
			editDialog: {
				top: "15vh",
				width: "65%",
				type: "add",
				title: "新增",
				visible: false,
				span: 12,
			},
			editForm: {
				crawlerColumnName: "",
				crawlerColumnUrl: "",
				crawlerPageCount: null,
				crawlerPageSize: null,
				crawlerReUrl: "",
				crawlerStartPage: null,
				crawlerEndPage: null,
				crawlerItem: "",
				crawlerItemTitle: "",
				crawlerItemUrl: "",
				crawlerItemTime: "",
				templateId: "",
				siteId: "",
				name: "",
				columnId: "",
				desc: "",
			},
			searchForm: {
				siteId: "",
			},
			// 表单验证规则
			editFormRules: {
				crawlerColumnUrl: [r_required],
				crawlerColumnName: [r_requiredc],
				crawlerPageCount: [r_required],
				crawlerPageSize: [r_required],
				crawlerStartPage: [r_required],
				crawlerEndPage: [r_required],
				siteId: [r_required],
				name: [r_required],
				columnId: [r_required],
				desc: [r_required],
				templateId: [r_required],
				crawlerItem: [r_required],
				crawlerItemTitle: [r_required],
				crawlerItemUrl: [r_required],
			},
		};
	},
	computed: {},
	created() {
		this.getDictType("speed_state", "status");
		this.getTemplateList();
		this.getSiteList();
	},
	mounted() {},
	methods: {
		getDictType(dict, key) {
			getDictItemByType(dict).then((res) => {
				this[key + "Dict"] = res.data;
			});
		},
		getSiteList() {
			getSiteList().then((res) => {
				this.siteList = res.data;
				this.searchForm.siteId =
					res.data.length > 0 ? res.data[0].id : "";
				this.getList();
			});
		},
		getTemplateList() {
			getTemplateList().then((res) => {
				this.templateList = res.data;
			});
		},
		getList() {
			getList({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				siteId: this.searchForm.siteId,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		add() {
			this.editForm = {
				crawlerColumnName: "",
				crawlerColumnUrl: "",
				crawlerPageCount: null,
				crawlerPageSize: null,
				crawlerReUrl: "",
				crawlerStartPage: null,
				crawlerEndPage: null,
				crawlerItem: "",
				crawlerItemTitle: "",
				crawlerItemUrl: "",
				crawlerItemTime: "",
				templateId: "",
				siteId: "",
				name: "",
				columnId: "",
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
		refresh(row) {
			putObj(row).then(() => {
				this.getList();
				this.$message.success("刷新成功");
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
			if (this.editForm.crawlerColumnUrl) {
				checkObj({
					url: this.editForm.crawlerColumnUrl,
				}).then((res) => {
					console.log(res);
					this.editForm.crawlerColumnName = res.data.title;
				});
			}
		},
		// 采集
		collect(row) {
			console.log(row);
			this.columnId = row.id;
			this.pageSize = row.crawlerPageSize;
			this.collectDialog.visible = true;
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