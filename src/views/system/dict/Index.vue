<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 09:56:07
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-radio-group v-model="type" size="mini" @change="getDict">
						<el-radio-button v-for="item in dictType" :label="item.value" :key="item.id">{{item.label}}</el-radio-button>
					</el-radio-group>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="type" label="字典类型" width="120" align="center">
								<template slot-scope="scope">{{scope.row.type == 1?'系统类':'业务类'}}</template>
							</el-table-column>
							<el-table-column prop="name" label="名称" width="220"></el-table-column>
							<el-table-column prop="value_type" label="数据类型" width="120" align="center"></el-table-column>
							<el-table-column prop="description" label="描述"></el-table-column>
							<el-table-column prop="remarks" label="备注信息"></el-table-column>
							<el-table-column prop="created_at" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="info"
										icon="el-icon-notebook-1"
										@click="getDictItem(scope.row)"
										title="字典项"
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
										:title="type==1?'系统类禁止删除':'删除'"
										@click="del(scope.row.id)"
										v-if="type!=1"
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
		<!-- 字典项弹窗 -->
		<el-dialog
			:title="itemsDialog.title"
			:visible.sync="itemsDialog.visible"
			:top="itemsDialog.top"
			:width="itemsDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<Items :dictId="dictId" :name="name"></Items>
		</el-dialog>
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
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="editDialog.span">
						<el-form-item label="字典类型" prop="type">
							<el-select
								v-model="editForm.type"
								placeholder="请选择字典类型"
								class="w100"
								:disabled="editForm.type == 1 && editDialog.type=='update' ? true : false"
							>
								<el-option
									v-for="item in dictType"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="名称" prop="name">
							<el-input
								v-model="editForm.name"
								maxlength="200"
								:disabled="editForm.type == 1  && editDialog.type=='update' ? true : false"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="描述" prop="description">
							<el-input v-model="editForm.description" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="备注">
							<el-input v-model="editForm.remarks" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="数据类型" prop="value_type">
							<el-radio-group
								v-model="editForm.value_type"
								:disabled="editForm.type == 1  && editDialog.type=='update' ? true : false"
							>
								<el-radio-button label="string">字符类型</el-radio-button>
								<el-radio-button label="number">数字类型</el-radio-button>
							</el-radio-group>
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
	getDict,
	getDictItemByType,
	addObj,
	putObj,
	delObj,
} from "@/api/system/dict";
import Items from "./components/Items.vue";
import va from "@/rules/index.js";

export default {
	components: {
		Items,
	},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_checkDictName = va.checkDictName("当前名称已存在");
		return {
			type: "1",
			dictId: null,
			name: "",
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			tableLoading: false,
			tableData: [],
			dictType: [],
			itemsDialog: {
				top: "15vh",
				width: "65%",
				type: "",
				title: "字典项管理",
				visible: false,
				span: 24,
			},
			editDialog: {
				top: "15vh",
				width: "45%",
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
			// 表单验证规则
			editFormRules: {
				type: [r_required],
				name: [r_required, r_checkDictName],
				value_type: [r_required],
				description: [r_required],
			},
		};
	},
	created() {
		this.getDictType();
	},
	mounted() {},
	methods: {
		// 查询数据字典的分类（系统类、业务类）
		getDictType() {
			getDictItemByType("dict_type").then((res) => {
				this.dictType = res.data;
				this.type = res.data.length > 0 ? res.data[0].value : null;
				this.getDict();
			});
		},
		getDict() {
			this.tableLoading = true;
			getDict({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				type: this.type,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		// 查询字典项
		getDictItem(row) {
			this.dictId = row.id;
			this.name = row.name;
			this.itemsDialog.visible = true;
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
						this.getDictType();
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
							this.getDict();
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.editForm).then(() => {
							this.editDialog.visible = false;
							this.getDict();
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
	},
};
</script>