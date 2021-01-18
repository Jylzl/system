<!--
 * @description: 菜单管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:51:35
 -->
<template>
	<el-container>
		<el-aside width="240px" class="aside-left">
			<div class="left-top">
				<el-button type="text" icon="el-icon-menu" @click="getMenuTree(false, -1);">顶级菜单</el-button>
				<el-button type="text" icon="el-icon-refresh" @click="getMenuTree(false,nowMenuID)">刷新</el-button>
			</div>
			<div class="left-center" v-loading="treeLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<el-menu
						default-active="0"
						class="el-menu-vertical-demo"
						:unique-opened="true"
						@select="menuTreeClick"
						@open="menuTreeClick"
					>
						<template v-for="item in  menuTree">
							<template v-if="item.display == 1">
								<el-submenu
									:index="(item.id).toString()"
									:key="item.id"
									v-if="item.children && item.leaf != 1"
								>
									<template slot="title">
										<i :class="item.icon"></i>
										<span>{{item.title}}</span>
									</template>
									<template v-for="child in item.children">
										<template v-if="child.display == 1">
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
													<template v-if="child2.display">
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
									<i :class="item.icon"></i>
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
					<el-dropdown @command="add">
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
			<div class="right-table-50" v-loading="tableLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="table-box">
						<el-table :data="menus" stripe style="width: 100%;height:100%;" size="small">
							<!-- <el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand">
										<el-form-item label="上级Id:">
											<span>{{ props.row.parentId }}</span>
										</el-form-item>
										<el-form-item label="名称:">
											<span>{{ props.row.name }}</span>
										</el-form-item>
										<el-form-item label="描述:">
											<span>{{ props.row.remark }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>-->
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
							<el-table-column prop="icon" label="图标" width="100" align="center">
								<template slot-scope="scope">
									<i :class="scope.row.icon" style="font-size:18px;"></i>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="名称" align="left"></el-table-column>
							<el-table-column prop="title" label="标题" align="left"></el-table-column>
							<el-table-column prop="url" label="路由/权限">
								<template slot-scope="scope">
									<span v-if="scope.row.type == 3">{{scope.row.perms}}</span>
									<span v-else>{{scope.row.url}}</span>
								</template>
							</el-table-column>
							<!-- <el-table-column prop="perms" label="权限"></el-table-column> -->
							<el-table-column prop="show" label="禁用" width="60" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.visible">是</span>
									<span v-else>否</span>
								</template>
							</el-table-column>
							<el-table-column prop="show" label="显示" width="60" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.display">是</span>
									<span v-else>否</span>
								</template>
							</el-table-column>
							<el-table-column prop="show" label="叶子节点" width="100" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.leaf">是</span>
									<span v-else>否</span>
								</template>
							</el-table-column>
							<el-table-column prop="orderNum" label="排序" width="60" align="center"></el-table-column>
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
				:model="menuForm"
				:rules="menuFormRules"
				ref="menuForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="menuDialog.span">
						<el-form-item label="上级菜单">
							<el-cascader
								v-model="menuForm.parentId"
								:options="menuTree"
								:props="menProps"
								:show-all-levels="false"
								clearable
								class="w100"
								placeholder="请选择上级菜单，为空则为顶级菜单"
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
						<el-form-item label="英文名称" prop="menuName">
							<el-input v-model="menuForm.name" maxlength="50" placeholder="请输入英文名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="中文标题" prop="menuTitle">
							<el-input v-model="menuForm.title" maxlength="50" placeholder="请输入中文标题"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span" v-if="menuForm.type == 1 || menuForm.type == 2">
						<el-form-item label="路由路径" prop="url">
							<el-input v-model="menuForm.url" maxlength="200" placeholder="请输入路由路径"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span" v-if="menuForm.type == 1 || menuForm.type == 2">
						<el-form-item label="重定向路径">
							<el-cascader
								v-model="menuForm.rurl"
								:options="menuTree"
								:props="rurlProps"
								:show-all-levels="false"
								clearable
								class="w100"
								placeholder="请选择重定向菜单"
							></el-cascader>
							<!-- <el-input v-model="menuForm.rurl" maxlength="200" placeholder="请输入重定向路径"></el-input> -->
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span" v-if="menuForm.type == 3">
						<el-form-item label="权限标识" prop="perms">
							<el-input v-model="menuForm.perms" maxlength="200" placeholder="请输入权限标识"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="图标" prop="icon">
							<icon-select v-model="menuForm.icon"></icon-select>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="排序">
							<el-input-number v-model="menuForm.orderNum" controls-position="right" class="w100"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="描述" prop="remark">
							<el-input v-model="menuForm.remark" maxlength="500" placeholder="请输入描述"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
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
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
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
			treeLoading: false, //树加载loading
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
			menuDialog: {
				top: "15vh",
				width: "60%",
				type: "add",
				title: "新增",
				visible: false,
				span: 12,
			},
			menuForm: {
				parentId: -1,
				orderNum: 0,
				icon: "",
				type: 2,
				name: "",
				title: "",
				url: "",
				rurl: "",
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
			rurlProps: {
				filterable: true,
				emitPath: false,
				checkStrictly: true,
				children: "children",
				label: "title",
				value: "url",
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
			this.menuDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["menuForm"].validate((valid) => {
				if (valid) {
					if (this.menuForm.parentId == "") {
						this.menuForm.parentId = -1;
					}
					if (this.menuDialog.menuForm == "add") {
						addObj(this.menuForm).then(() => {
							this.menuDialog.visible = false;
							this.getMenuTree(false, this.nowMenuID); //获取菜单列表
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.menuForm).then(() => {
							this.menuDialog.visible = false;
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
		add(menuType) {
			this.menuDialog.visible = true;
			this.menuDialog.menuForm = "add";
			this.menuDialog.title = "新增";
			this.menuForm = {
				parentId: Number(this.nowMenuID),
				orderNum: 0,
				icon: "",
				type: menuType,
				name: "",
				title: "",
				url: "",
				rurl: "",
				perms: "",
				visible: 1,
				display: 1,
				leaf: 0,
				remark: "",
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
						this.getMenuList(this.nowMenuID); //获取菜单列表
						this.getMenuTree(false, this.nowMenuID); //获取菜单树
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
			this.menuDialog.menuForm = "update";
			this.menuDialog.title = "修改";
			this.menuForm = row;
		},
		//获取菜单列表
		getMenuList(id) {
			this.tableLoading = true;
			getMenu({
				parentId: id,
			}).then((res) => {
				this.menus = res.data;
				this.tableLoading = false;
			});
		},
		//获取菜单树
		getMenuTree(lazy, parentId) {
			this.treeLoading = true;
			this.nowMenuID = parentId;
			this.getMenuList(parentId); //获取菜单列表
			fetchMenuTree(lazy, -1, "1,2").then((res) => {
				this.menuTree = res.data;
				this.treeLoading = false;
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
				this.creatBread(obj.parentId, arr);
			} else {
				arr.push(this.breadItems[0]);
				this.breadItems = arr.reverse();
				return false;
			}
		},
	},
};
</script>