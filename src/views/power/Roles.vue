<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 22:10:32
 -->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left"></div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="addRole">添加</el-button>
				</div>
			</div>
			<div class="right-table" v-loading="tableLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="table-box">
						<el-table :data="menus" stripe style="width: 100%;height:100%;" size="small">
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand">
										<el-form-item label="上级Id:">
											<span>{{ props.row.parent_id }}</span>
										</el-form-item>
										<el-form-item label="名称:">
											<span>{{ props.row.name }}</span>
										</el-form-item>
										<el-form-item label="描述:">
											<span>{{ props.row.remark }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="角色名称" align="left"></el-table-column>
							<el-table-column prop="name" label="角色标识" align="left"></el-table-column>
							<el-table-column prop="name" label="角色描述" align="left"></el-table-column>
							<el-table-column prop="name" label="数据权限" align="left"></el-table-column>
							<el-table-column prop="name" label="创建时间" align="left"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										@click="updateMenu(scope.row)"
										icon="el-icon-edit"
										title="编辑"
										circle
									></el-button>
									<el-button
										size="mini"
										type="danger"
										@click="delMenu(scope.row.id)"
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
				:model="menuForm"
				:rules="menuFormRules"
				ref="menuForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="roleDialog.span">
						<el-form-item label="上级菜单">
							<el-cascader
								v-model="menuForm.parent_id"
								:options="menuTree"
								:props="menProps"
								:show-all-levels="false"
								clearable
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="类型">
							<el-radio-group v-model="menuForm.type">
								<el-radio
									:label="item.menuType"
									border
									v-for="item in menuTypeLists"
									:key="item.menuType"
								>{{item.name}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="名称" prop="menuName">
							<el-input v-model="menuForm.name" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="标题" prop="menuTitle">
							<el-input v-model="menuForm.title" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span" v-if="menuForm.type == 1 || menuForm.type == 2">
						<el-form-item label="路由路径" prop="url">
							<el-input v-model="menuForm.url" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span" v-if="menuForm.type == 3">
						<el-form-item label="权限标识" prop="perms">
							<el-input v-model="menuForm.perms" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="图标" prop="icon">
							<icon-select v-model="menuForm.icon"></icon-select>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="排序">
							<el-input-number v-model="menuForm.order_num" controls-position="right" class="w100"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-form-item label="描述" prop="remark">
							<el-input v-model="menuForm.remark" maxlength="500"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="roleDialog.span">
						<el-row>
							<el-col :span="8">
								<el-form-item label="禁用">
									<el-switch v-model="menuForm.visible" :active-value="0" :inactive-value="1"></el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="显示">
									<el-switch v-model="menuForm.display" :active-value="1" :inactive-value="0"></el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="叶子节点">
									<el-switch v-model="menuForm.leaf" :active-value="1" :inactive-value="0"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="menuSave()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('menuForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>
<script>
import va from "@/rules/index.js";
import {
	addObj,
	delObj,
	fetchMenuTree,
	putObj,
	getMenu,
} from "@/api/power/menu";
import IconSelect from "@/components/IconSelect.vue";
export default {
	name: "menuList",
	components: {
		"icon-select": IconSelect,
	},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_notRequired = va.notRequired();
		let r_number = va.number();
		let r_string = va.string();
		let r_checkChinese = va.checkChinese();
		return {
			tableLoading: false, //表格加载loading
			menuTreeLoading: false, //菜单树加载loading
			//二级面包屑
			breadItems: [
				{
					name: "顶级菜单",
					id: -1,
				},
			],
			menuTypeLists: [
				{
					menuType: 1,
					name: "目录",
				},
				{
					menuType: 2,
					name: "菜单",
				},
				{
					menuType: 3,
					name: "按钮",
				},
			],
			menus: [],
			menuArray: [],
			menuTree: [],
			nowMenuID: -1,
			// 表单信息
			roleDialog: {
				top: "15vh",
				width: "60%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			menuForm: {
				parent_id: -1,
				order_num: 0,
				icon: "",
				type: 2,
				name: "",
				title: "",
				url: "",
				perms: "",
				visible: 1,
				display: 1,
				leaf: 0,
				remark: "",
			},
			menProps: {
				filterable: true,
				emitPath: false,
				checkStrictly: true,
				children: "children",
				label: "title",
				value: "id",
			},
			// 表单验证规则
			menuFormRules: {
				account: [r_required],
				orderNum: [r_required, r_number],
				icon: [r_checkChinese],
				menuName: [r_required, r_string],
				menuTitle: [r_required],
				url: [r_required, r_checkChinese],
				perms: [r_required, r_checkChinese],
				remark: [r_notRequired],
			},
		};
	},
	created() {
		this.getMenuTree(false, this.nowMenuID); //获取菜单树
	},
	mounted() {},
	filters: {},
	computed: {},
	methods: {
		//
		beforeClose(done) {
			this.$refs["menuForm"].resetFields();
			done();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.roleDialog.visible = false;
		},
		// 保存
		menuSave() {
			this.$refs["menuForm"].validate((valid) => {
				if (valid) {
					if (this.menuForm.parent_id == "") {
						this.menuForm.parent_id = -1;
					}
					if (this.roleDialog.menuForm == "add") {
						addObj(this.menuForm).then((res) => {
							console.log(res);
							this.roleDialog.visible = false;
							this.getMenuTree(false, this.nowMenuID); //获取菜单列表
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.menuForm).then((res) => {
							console.log(res);
							this.roleDialog.visible = false;
							this.getMenuTree(false, this.nowMenuID); //获取菜单列表
							this.$message.success("修改成功");
						});
					}
				} else {
					return false;
				}
			});
		},
		//添加
		addRole() {
			console.log("1");
			this.roleDialog.visible = true;
			this.roleDialog.menuForm = "add";
			this.roleDialog.title = "新增";
			this.menuForm = {
				parent_id: Number(this.nowMenuID),
				order_num: 0,
				icon: "",
				type: 1,
				name: "",
				title: "",
				url: "",
				perms: "",
				visible: 1,
				display: 1,
				leaf: 0,
				remark: "",
			};
		},
		//删除
		delMenu(menuId) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.tableLoading = true;
					delObj(menuId).then((res) => {
						console.log(res);
						this.tableLoading = false;
						this.getMenuList(this.nowMenuID); //获取菜单列表
						this.$message.success("删除成功");
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
		updateMenu(menu) {
			this.roleDialog.visible = true;
			this.roleDialog.menuForm = "update";
			this.roleDialog.title = "修改";
			this.menuForm = menu;
		},
		//获取菜单列表
		getMenuList(id) {
			this.tableLoading = true;
			getMenu({
				parent_id: id,
			}).then((res) => {
				console.log(res);
				this.menus = res.data;
				this.tableLoading = false;
			});
		},
		//获取菜单树
		getMenuTree(lazy, parent_id) {
			this.menuTreeLoading = true;
			this.nowMenuID = parent_id;
			this.getMenuList(parent_id); //获取菜单列表
			fetchMenuTree(lazy, -1).then((res) => {
				this.menuTree = res.data;
				this.menuTreeLoading = false;
			});
		},
		//菜单树点击事件
		menuTreeClick(index) {
			this.nowMenuID = index;
			this.getMenuList(index);
			// this.creatBread(index, []);
		},
		//二级面包屑
		creatBread(menuId, arr) {
			if (menuId != -1) {
				let obj = this.menuArray.filter((element) => {
					return element.id == menuId;
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
	},
};
</script>

<style>
.left-center .el-menu {
	border-right: none;
}

.el-table__body-wrapper {
	height: calc(100% - 40px);
}
</style>

<style scoped>
.el-container {
	height: 100%;
}

.el-aside {
	box-sizing: border-box;
	border-right: 2px solid #d4dde2;
	background-color: #fff;
	line-height: 1;
}

.left-center .icon {
	margin-right: 15px;
	font-size: 16px;
}

.left-top,
.right-top,
.right-bottom {
	display: flex;
	align-items: center;
	/*垂直居中*/
	box-sizing: border-box;
	height: 50px;
	padding: 5px 15px;
	line-height: 40px;
}

.left-top,
.right-top {
	justify-content: space-between;
	border-bottom: 1px dashed #e7ecf3;
}

.left-center,
.right-table {
	height: calc(100% - 50px);
}

.right-bottom {
	justify-content: flex-start;
}

.right-bottom .el-dropdown,
.right-bottom .el-button + .el-button {
	margin-left: 3px;
}

.right-bottom .el-dropdown .el-button {
	height: 30px;
}

.el-breadcrumb {
	line-height: 40px;
}

.el-main {
	background-color: #fff;
	padding: 0;
}

.table-box {
	height: 100%;
}

.list-paging {
	box-sizing: border-box;
	height: 50px;
	line-height: 50px;
	margin-top: 30px;
	padding: 5px 15px;
	text-align: right;
}

.news-link {
	display: inline;
	color: inherit;
	text-decoration: none;
}

.demo-table-expand {
	font-size: 0;
}

.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}

.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 20%;
}
</style>