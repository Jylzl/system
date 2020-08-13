<!--
 * @description: 部门管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 12:43:05
 -->
<template>
	<el-container>
		<el-aside width="240px">
			<div class="left-top">
				<el-button type="text" icon="el-icon-menu" @click="getDeptTree(false, -1);">顶级部门</el-button>
				<el-button type="text" icon="el-icon-refresh" @click="getDeptTree(false,nowDeptID)">刷新</el-button>
			</div>
			<div class="left-center" v-loading="treeLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<el-tree
						:data="deptTree"
						:props="deptTreeProps"
						:default-expand-all="true"
						@node-click="deptTreeClick"
					></el-tree>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item v-for="(item,index) in breadItems" :key="index">{{item.name}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100" v-loading="tableLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="table-box">
						<el-table :data="depts" stripe style="width: 100%;height:100%;" size="small">
							<el-table-column prop="code" label="部门编号" align="center" width="160px"></el-table-column>
							<el-table-column prop="name" label="部门名称" align="left"></el-table-column>
							<el-table-column prop="abbreviation" label="部门简称" align="left"></el-table-column>
							<el-table-column prop="desc" label="部门描述" align="left"></el-table-column>
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
			:title="menuDialog.title"
			:visible.sync="menuDialog.visible"
			:top="menuDialog.top"
			:width="menuDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<!-- 修改表单 -->
			<el-form
				:model="deptForm"
				:rules="deptFormRules"
				ref="deptForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="menuDialog.span">
						<el-form-item label="上级部门">
							<el-cascader
								v-model="deptForm.parent_id"
								:options="deptTree"
								:props="deptCascaderProps"
								:show-all-levels="false"
								clearable
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="部门名称" prop="name">
							<el-input v-model="deptForm.name" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="部门简称" prop="abbreviation">
							<el-input v-model="deptForm.abbreviation" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.code">
						<el-form-item label="部门编号" prop="code">
							<el-input v-model="deptForm.code" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="排序">
							<el-input-number v-model="deptForm.order_num" controls-position="right" class="w100"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.desc">
						<el-form-item label="部门描述" prop="desc">
							<el-input
								v-model="deptForm.desc"
								type="textarea"
								:rows="4"
								placeholder="请输入部门描述"
								maxlength="200"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('deptForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>
<script>
import va from "@/rules/index.js";
import {
	addObj,
	delObj,
	fetchDeptTree,
	putObj,
	getDept,
} from "@/api/power/dept";
export default {
	name: "menuList",
	components: {},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_notRequired = va.notRequired();
		let r_number = va.number();
		let r_checkChinese = va.checkChinese();
		return {
			tableLoading: false, //表格加载loading
			treeLoading: false, //树加载loading
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			//二级面包屑
			breadItems: [
				{
					name: "顶级部门",
					id: -1,
				},
			],
			depts: [],
			menuArray: [],
			deptTree: [],
			nowDeptID: -1,
			// 表单信息
			menuDialog: {
				top: "15vh",
				width: "45%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			deptForm: {
				parent_id: -1,
				name: "",
				abbreviation: "",
				code: "",
				desc: "",
				order_num: 0,
			},
			deptTreeProps: {
				children: "children",
				label: "abbreviation",
			},
			deptCascaderProps: {
				filterable: true,
				emitPath: false,
				checkStrictly: true,
				children: "children",
				label: "name",
				value: "id",
			},
			// 表单验证规则
			deptFormRules: {
				name: [r_required],
				abbreviation: [r_required],
				code: [r_checkChinese],
				order_num: [r_required, r_number],
				desc: [r_notRequired],
			},
		};
	},
	created() {
		this.getDeptTree(false, this.nowDeptID); //获取部门树
	},
	mounted() {},
	filters: {},
	computed: {},
	methods: {
		//
		beforeClose(done) {
			this.$refs["deptForm"].resetFields();
			done();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.menuDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["deptForm"].validate((valid) => {
				if (valid) {
					if (this.deptForm.parent_id == "") {
						this.deptForm.parent_id = -1;
					}
					if (this.menuDialog.deptForm == "add") {
						addObj(this.deptForm).then(() => {
							this.menuDialog.visible = false;
							this.getDeptTree(false, this.nowDeptID); //获取部门列表
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.deptForm).then(() => {
							this.menuDialog.visible = false;
							this.getDeptTree(false, this.nowDeptID); //获取部门列表
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
			this.menuDialog.visible = true;
			this.menuDialog.deptForm = "add";
			this.menuDialog.title = "新增";
			this.deptForm = {
				parent_id: Number(this.nowDeptID),
				name: "",
				abbreviation: "",
				code: "",
				desc: "",
				order_num: 0,
			};
		},
		//删除
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
						this.getDeptList(this.nowDeptID); //获取部门列表
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
			this.menuDialog.visible = true;
			this.menuDialog.deptForm = "update";
			this.menuDialog.title = "修改";
			this.deptForm = row;
		},
		//获取部门列表
		getDeptList(id) {
			this.tableLoading = true;
			getDept({
				parent_id: id,
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.depts = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		//获取部门树
		getDeptTree(lazy, parent_id) {
			this.treeLoading = true;
			this.nowDeptID = parent_id;
			this.getDeptList(parent_id); //获取部门列表
			fetchDeptTree(lazy, -1).then((res) => {
				this.deptTree = res.data;
				this.treeLoading = false;
			});
		},
		//部门树点击事件
		deptTreeClick(index) {
			this.nowDeptID = index.id;
			this.getDeptList(index.id);
			// this.creatBread(index, []);
		},
		//二级面包屑
		creatBread(deptId, arr) {
			if (deptId != -1) {
				let obj = this.menuArray.filter((element) => {
					return element.id == deptId;
				})[0];
				let params = {
					name: obj.title,
					id: obj.id,
				};
				arr.push(params);
				this.creatBread(obj.parent_id, arr);
			} else {
				arr.push(this.breadItems[0]);
				this.breadItems = arr.reverse();
				return false;
			}
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getDeptList(); //获取角色列表
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getDeptList(); //获取角色列表
		},
	},
};
</script>