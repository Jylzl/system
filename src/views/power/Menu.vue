<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-10 18:41:07
 -->
<template>
	<el-container>
		<el-aside width="240px">
			<div class="left-top">
				<el-button type="text" icon="el-icon-menu" @click="getMenuTree(false, -1);">顶级菜单</el-button>
				<el-button type="text" icon="el-icon-refresh" @click="getMenuTree(false,nowMenuID)">刷新</el-button>
			</div>
			<div class="left-center" v-loading="menuTreeLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<el-menu
						default-active="0"
						class="el-menu-vertical-demo"
						:unique-opened="true"
						@select="menuTreeClick"
						@open="menuTreeClick"
					>
						<template v-for="item in  menuTree">
							<template v-if="item.display == 0">
								<el-submenu
									:index="(item.id).toString()"
									:key="item.id"
									v-if="item.children && item.leaf != 1"
								>
									<template slot="title">
										<i :class="'icon iconfont ' + item.icon"></i>
										<span>{{item.title}}</span>
									</template>
									<template v-for="child in item.children">
										<template v-if="child.display == 0">
											<el-menu-item
												v-if="!(child.children) || child.leaf == 1"
												:index="(child.id).toString()"
												:key="child.path"
											>{{child.title}}</el-menu-item>
											<el-submenu
												v-else
												:index="(child.id).toString()"
												class="child-padding"
												:key="child.path"
											>
												<template slot="title">
													<span class="collapse-font">{{child.title}}</span>
												</template>
												<template v-for="child2 in child.children">
													<template v-if="child2.display == 0">
														<el-menu-item
															v-if="!(child2.children)  || child2.leaf == 1"
															:index="(child2.id).toString()"
															:key="child2.path"
														>{{child2.title}}</el-menu-item>
														<el-submenu
															v-else
															:index="(child2.id).toString()"
															class="child-padding"
															:key="child2.path"
														>
															<template slot="title">
																<span class="collapse-font">{{child2.title}}</span>
															</template>
															<template v-for="child3 in child2.children">
																<el-menu-item :index="(child3.id).toString()" :key="child3.path">{{child3.title}}</el-menu-item>
															</template>
														</el-submenu>
													</template>
												</template>
											</el-submenu>
										</template>
									</template>
								</el-submenu>
								<el-menu-item :index="(item.id).toString()" :key="item.id" v-else>
									<i :class="'icon iconfont ' + item.icon"></i>
									<span slot="title">{{item.title}}</span>
								</el-menu-item>
							</template>
						</template>
					</el-menu>
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
					<el-dropdown @command="addMenu">
						<el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								v-for="item in menuTypeLists"
								:key="item.menuType"
								:command="item.menuType"
							>{{'添加'+item.name}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
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
							<el-table-column prop="order_num" label="排序" width="60" align="center"></el-table-column>
							<el-table-column label="类型" width="80" align="center">
								<template slot-scope="scope">
									<template v-for="item in menuTypeLists">
										<el-tag
											type="success"
											size="medium"
											v-if="scope.row.type == item.menuType"
											:key="item.menuType"
										>{{item.name}}</el-tag>
									</template>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="名称" align="left"></el-table-column>
							<el-table-column prop="icon" label="图标" width="100" align="center">
								<template slot-scope="scope">
									<i :class="'icon iconfont '+scope.row.icon"></i>
								</template>
							</el-table-column>
							<el-table-column prop="title" label="标题" align="left" :show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="show" label="禁用" width="60" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.visible == '1'">否</span>
									<span v-else>是</span>
								</template>
							</el-table-column>
							<el-table-column prop="show" label="显示" width="60" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.display == '1'">是</span>
									<span v-else>否</span>
								</template>
							</el-table-column>
							<el-table-column prop="show" label="叶子节点" width="100" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.leaf == '1'">是</span>
									<span v-else>否</span>
								</template>
							</el-table-column>
							<el-table-column prop="url" label="前端地址"></el-table-column>
							<el-table-column prop="perms" label="权限"></el-table-column>
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
			:title="menuDialog.title"
			:visible.sync="menuDialog.visible"
			:top="menuDialog.top"
			:width="menuDialog.width"
			:close-on-click-modal="false"
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
					<el-col :span="menuDialog.span">
						<el-form-item label="上级菜单" prop="menProp">
							<el-cascader
								v-model="menuForm.parent_id"
								:options="menuTree"
								:props="menProps"
								:show-all-levels="false"
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
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
					<el-col :span="menuDialog.span">
						<el-form-item label="名称" prop="menuName">
							<el-input v-model="menuForm.name" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="标题" prop="menuTitle">
							<el-input v-model="menuForm.title" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span" v-if="menuForm.type == 1 || menuForm.type == 2">
						<el-form-item label="路由路径" prop="url">
							<el-input v-model="menuForm.url" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span" v-if="menuForm.type == 3">
						<el-form-item label="权限标识" prop="perms">
							<el-input v-model="menuForm.perms" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="图标" prop="icon">
							<el-input placeholder="请输入内容" v-model="menuForm.icon" maxlength="100">
								<template slot="prepend">
									<i :class="'icon iconfont ' + menuForm.icon"></i>
								</template>
								<el-button slot="append" icon="icon iconfont icon-charutupian"></el-button>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="排序">
							<el-input-number v-model="menuForm.order_num" controls-position="right" class="w100"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="描述" prop="remark">
							<el-input v-model="menuForm.remark" maxlength="500"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-row>
							<el-col :span="8">
								<el-form-item label="禁用">
									<el-switch v-model="menuForm.visible" active-value="0" inactive-value="1"></el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="显示">
									<el-switch v-model="menuForm.display" active-value="1" inactive-value="0"></el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="叶子节点">
									<el-switch v-model="menuForm.leaf" active-value="1" inactive-value="0"></el-switch>
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
import { translateDataToTree } from "@/utils/tools.js";
import va from "@/rules/index.js";
import {
	addObj,
	delObj,
	fetchMenuTree,
	getObj,
	putObj,
	getMenu,
} from "@/api/power/menu";
export default {
	name: "menuList",
	components: {},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_notRequired = va.notRequired();
		let r_icon = va.required("", "change");
		let r_number = va.number();
		let r_string = va.string();
		let r_checkChinese = va.checkChinese();
		return {
			tableLoading: false, //表格加载loading
			menuTreeLoading: false, //菜单树加载loading
			breadItems: [
				{
					name: "顶级菜单",
					id: -1,
				},
			], //二级面包屑
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
			dialogVisible: false,
			dialogTitle: "新增",
			// 表单信息
			menuDialog: {
				top: "15vh",
				width: "60%",
				type: "add",
				title: "新增",
				visible: false,
				span: 12,
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
				menProp: [r_required],
				account: [r_required],
				orderNum: [r_required, r_number],
				icon: [r_icon, r_checkChinese],
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.menuDialog.visible = false;
		},
		//添加菜单/按钮
		addMenu(menuType) {
			this.menuDialog.visible = true;
			this.menuForm.type = menuType;
			console.log(menuType);
		},
		// 添加保存
		menuSave() {
			this.$refs["menuForm"].validate((valid) => {
				if (valid) {
					addObj(this.menuForm).then((res) => {
						console.log(res);
						this.menuDialog.visible = false;
						this.getMenuList(this.nowMenuID); //获取菜单列表
						this.$message.success("添加成功");
					});
				} else {
					return false;
				}
			});
		},
		//删除菜单/按钮
		delMenu(menuId) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.tableLoading = true;
					this.$axios
						.get(this.$api.meunDel, {
							params: {
								menuId: menuId,
							},
						})
						.then((res) => {
							if (res.code == this.$code.success) {
								this.refreshMenu(this.nowMenuID); //删除成功后刷新菜单数据
								this.successMessage("删除成功");
							} else {
								this.errorMessage(res.data);
								this.tableLoading = false;
							}
						})
						.catch((err) => {
							console.log(err);
							this.tableLoading = false;
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		//修改菜单/按钮
		updateMenu(menu) {
			this.menuForm = menu;
			this.menuDialog.visible = true;
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
			this.getMenuList(this.nowMenuID); //获取菜单列表
			this.menuTreeLoading = true;
			fetchMenuTree(lazy, parent_id).then((res) => {
				console.log("fetchMenuTree");
				console.log(res.data);
				this.menuTree = res.data;
				this.menuTreeLoading = false;
			});
		},
		//菜单树点击事件
		menuTreeClick(index) {
			console.log(index);
			this.getMenuList(index);
		},
		//二级面包屑
		creatBread(menuId, arr) {
			if (menuId != -1) {
				let obj = this.menuArray.filter((element) => {
					return element.menuId == menuId;
				})[0];
				let params = {
					name: obj.title,
					menuId: obj.menuId,
				};
				arr.push(params);
				this.creatBread(obj.parentId, arr);
			} else {
				arr.push(this.breadItems[0]);
				this.breadItems = arr.reverse();
				return false;
			}
		},
		//刷新部门数据
		refreshMenu(nowMenuID) {
			this.getMenuTree();
			this.getMenuList(nowMenuID);
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