<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 11:14:20
 -->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left"></div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100" v-loading="tableLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="table-box">
						<el-table :data="roles" stripe style="width: 100%;height:100%;" size="small">
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand">
										<el-form-item label="角色名称:">
											<span>{{ props.row.name }}</span>
										</el-form-item>
										<el-form-item label="角色标识:">
											<span>{{ props.row.code }}</span>
										</el-form-item>
										<el-form-item label="角色描述:">
											<span>{{ props.row.desc }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="角色名称" align="left"></el-table-column>
							<el-table-column prop="code" label="角色标识" align="left"></el-table-column>
							<el-table-column prop="desc" label="角色描述" align="left"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										@click="update(scope.row)"
										icon="el-icon-edit"
										title="编辑"
										circle
									></el-button>
									<el-button
										size="mini"
										type="danger"
										@click="del(scope.row.id)"
										icon="el-icon-delete"
										title="删除"
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
			:title="roleDialog.title"
			:visible.sync="roleDialog.visible"
			:top="roleDialog.top"
			:width="roleDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<!-- 修改表单 -->
			<el-form
				:model="roleForm"
				:rules="roleFormRules"
				ref="roleForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="roleDialog.span">
						<el-form-item label="角色名称" prop="name">
							<el-input v-model="roleForm.name" maxlength="50" placeholder="请输入角色名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="角色标识" prop="code">
							<el-input v-model="roleForm.code" maxlength="50" placeholder="请输入角色标识"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="菜单权限" prop="code">
							<el-cascader
								v-model="roleForm.menus"
								:options="menuTree"
								:props="menProps"
								clearable
								placeholder="请选择菜单权限"
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="角色描述">
							<el-input
								v-model="roleForm.desc"
								type="textarea"
								:rows="4"
								placeholder="请输入角色描述"
								maxlength="50"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('roleForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>
<script>
import va from "@/rules/index.js";
import { addObj, delObj, putObj, getRole } from "@/api/power/role";
import { fetchMenuTree } from "@/api/power/menu";
export default {
	name: "menuList",
	components: {},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_checkChinese = va.checkChinese();
		return {
			tableLoading: false, //表格加载loading
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			roles: [],
			menuTree: [],
			menProps: {
				multiple: true,
				emitPath: false,
				checkStrictly: true,
				children: "children",
				label: "title",
				value: "id",
			},
			// 表单信息
			roleDialog: {
				top: "15vh",
				width: "45%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			roleForm: {
				name: "",
				code: "",
				desc: "",
				menus: [],
			},
			// 表单验证规则
			roleFormRules: {
				name: [r_required],
				code: [r_required, r_checkChinese],
			},
		};
	},
	created() {
		this.getRoleList(); //获取角色列表
		fetchMenuTree(false, -1).then((res) => {
			this.menuTree = res.data;
		});
	},
	mounted() {},
	filters: {},
	computed: {},
	methods: {
		//获取角色列表
		getRoleList() {
			this.tableLoading = true;
			getRole({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.roles = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		//
		beforeClose(done) {
			this.$refs["roleForm"].resetFields();
			done();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.roleDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["roleForm"].validate((valid) => {
				if (valid) {
					if (this.roleForm.parent_id == "") {
						this.roleForm.parent_id = -1;
					}
					if (this.roleDialog.roleForm == "add") {
						addObj(this.roleForm).then(() => {
							this.roleDialog.visible = false;
							this.getRoleList(); //获取角色列表
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.roleForm).then(() => {
							this.roleDialog.visible = false;
							this.getRoleList(); //获取角色列表
							this.$message.success("修改成功");
						});
					}
				} else {
					return false;
				}
			});
		},
		//添加
		add() {
			console.log("1");
			this.roleDialog.visible = true;
			this.roleDialog.roleForm = "add";
			this.roleDialog.title = "新增";
			this.roleForm = {
				name: "",
				code: "",
				desc: "",
				menus: [],
			};
		},
		//删除
		del(menuId) {
			this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.tableLoading = true;
					delObj(menuId).then((res) => {
						console.log(res);
						this.tableLoading = false;
						this.getRoleList(); //获取角色列表
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
		//修改
		update(row) {
			this.roleDialog.visible = true;
			this.roleDialog.roleForm = "update";
			this.roleDialog.title = "修改";
			this.roleForm = row;
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getRoleList(); //获取角色列表
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getRoleList(); //获取角色列表
		},
	},
};
</script>