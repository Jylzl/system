<!--
 * @description: 字典项
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 17:01:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 11:23:18
-->
<template>
	<div class="dialog-box h100">
		<div class="box-top">
			<el-button type="primary" icon="el-icon-edit" size="mini" @click="add">添加</el-button>
		</div>
		<div class="box-center">
			<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
				<el-table-column prop="dict_id" label="名称" width="120" align="center">
					<template>{{name}}</template>
				</el-table-column>
				<el-table-column prop="label" label="标签名" width="100" align="center"></el-table-column>
				<el-table-column prop="value" label="数据值" width="100" align="center"></el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column prop="remarks" label="备注"></el-table-column>
				<el-table-column prop="order_num" label="排序" width="80" align="center"></el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="primary"
							icon="el-icon-edit"
							@click="update(scope.row)"
							title="编辑"
							circle
						></el-button>
						<el-button
							size="mini"
							type="danger"
							icon="el-icon-delete"
							@click="del(scope.row.id)"
							title="删除"
							circle
						></el-button>
					</template>
				</el-table-column>
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
					:total="page.total"
					:hide-on-single-page="true"
					background
				></el-pagination>
			</div>
		</div>
		<!-- 修改表单弹窗 -->
		<el-dialog
			:title="editDialog.title"
			:visible.sync="editDialog.visible"
			:top="editDialog.top"
			:width="editDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
			append-to-body
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
						<el-form-item label="标签名" prop="label">
							<el-input v-model="editForm.label" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="editDialog.span">
						<el-form-item label="数据值" prop="value">
							<el-input v-model="editForm.value" maxlength="200"></el-input>
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
						<el-form-item label="排序">
							<el-input-number v-model="editForm.order_num"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('editForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getDictItem, addObj, putObj, delObj } from "@/api/system/dictitem";
import va from "@/rules/index.js";
export default {
	name: "DictItems",
	props: {
		dictId: {
			type: Number,
		},
		name: {
			type: String,
		},
	},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_checkDictItemName = va.checkDictItemName(
			"当前数据已存在",
			this.dictId
		);
		return {
			tableLoading: false,
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizes: [5, 10, 20, 50],
			},
			tableData: [],
			editDialog: {
				top: "15vh",
				width: "45%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			editForm: {
				dict_id: null,
				label: "",
				value: "",
				description: "",
				remarks: "",
				order_num: null,
			},
			// 表单验证规则
			editFormRules: {
				dict_id: [r_required],
				label: [r_required],
				value: [r_required, r_checkDictItemName],
				description: [r_required],
			},
		};
	},
	created() {
		this.editForm.dict_id = this.dictId;
		this.getDictItem(this.dictId);
	},
	methods: {
		getDictItem(id) {
			this.tableLoading = true;
			getDictItem({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				dictId: id,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		add() {
			this.editForm = {
				dict_id: this.dictId,
				label: "",
				value: "",
				description: "",
				remarks: "",
				order_num: null,
			};
			this.editDialog.type = "add";
			this.editDialog.title = "新增";
			this.editDialog.visible = true;
		},
		update(row) {
			this.editForm = row;
			this.editForm.dict_id = this.dictId;
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
						this.getDictItem(this.dictId);
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
							this.getDictItem(this.dictId);
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.editForm).then(() => {
							this.editDialog.visible = false;
							this.getDictItem(this.dictId);
							this.$message.success("修改成功");
						});
					}
				} else {
					return false;
				}
			});
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getDictItem();
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getDictItem();
		},
		beforeClose(done) {
			done();
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
.box-bottom {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.z-index-3002 {
	z-index: 3002;
}
</style>