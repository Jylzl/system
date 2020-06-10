<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-06-10 14:17:19
 -->
<template>
	<el-container>
		<el-aside width="240px">
			<div class="left-top">
				<el-button type="text" icon="el-icon-menu" @click="menuTreeClick(-1)">顶级菜单</el-button>
				<el-button type="text" icon="el-icon-refresh" @click="menuTreeClick(nowMenuID)">刷新</el-button>
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
							<template v-if="item.display == '1'">
								<el-submenu
									:index="(item.menuId).toString()"
									:key="item.menuId"
									v-if="item.children && item.leaf != '1'"
								>
									<template slot="title">
										<i :class="'icon iconfont ' + item.icon"></i>
										<span>{{item.title}}</span>
									</template>
									<template v-for="child in item.children">
										<template v-if="child.display == '1'">
											<el-menu-item
												v-if="!(child.children) || child.leaf == '1'"
												:index="(child.menuId).toString()"
												:key="child.path"
											>{{child.title}}</el-menu-item>
											<el-submenu
												v-else
												:index="(child.menuId).toString()"
												class="child-padding"
												:key="child.path"
											>
												<template slot="title">
													<span class="collapse-font">{{child.title}}</span>
												</template>
												<template v-for="child2 in child.children">
													<template v-if="child2.display == '1'">
														<el-menu-item
															v-if="!(child2.children)  || child2.leaf == '1'"
															:index="(child2.menuId).toString()"
															:key="child2.path"
														>{{child2.title}}</el-menu-item>
														<el-submenu
															v-else
															:index="(child2.menuId).toString()"
															class="child-padding"
															:key="child2.path"
														>
															<template slot="title">
																<span class="collapse-font">{{child2.title}}</span>
															</template>
															<template v-for="child3 in child2.children">
																<el-menu-item
																	:index="(child3.menuId).toString()"
																	:key="child3.path"
																>{{child3.title}}</el-menu-item>
															</template>
														</el-submenu>
													</template>
												</template>
											</el-submenu>
										</template>
									</template>
								</el-submenu>
								<el-menu-item :index="(item.menuId).toString()" :key="item.menuId" v-else>
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
										<el-form-item label="parentId:">
											<span>{{ props.row.parentId }}</span>
										</el-form-item>
										<el-form-item label="Name:">
											<span>{{ props.row.menuName }}</span>
										</el-form-item>
										<el-form-item label="描述:">
											<span>{{ props.row.remark }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column prop="orderNum" label="排序" width="60" align="center"></el-table-column>
							<el-table-column label="类型" width="80" align="center">
								<template slot-scope="scope">
									<el-tag type="success" size="medium" v-if="scope.row.menuType == 'C'">菜单</el-tag>
									<el-tag type="info" v-else>按钮</el-tag>
								</template>
							</el-table-column>
							<el-table-column prop="menuName" label="名称" align="left"></el-table-column>
							<el-table-column prop="icon" label="图标" width="100" align="center">
								<template slot-scope="scope">
									<i :class="'icon iconfont '+scope.row.icon"></i>
								</template>
							</el-table-column>
							<el-table-column prop="menuTitle" label="标题" align="left" :show-overflow-tooltip="true"></el-table-column>
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
										@click="delMenu(scope.row.menuId)"
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
	</el-container>
</template>
<script>
import { translateDataToTree } from "@/utils/tools.js";
export default {
	name: "menuList",
	components: {},
	data() {
		return {
			tableLoading: false, //表格加载loading
			menuTreeLoading: false, //菜单树加载loading
			breadItems: [
				{
					name: "顶级菜单",
					menuId: -1
				}
			], //二级面包屑
			menuTypeLists: [
				{
					menuType: "C",
					name: "菜单"
				},
				{
					menuType: "F",
					name: "按钮"
				}
			],
			menus: [],
			menuArray: [],
			menuTree: [],
			nowMenuID: -1
		};
	},
	created() {
		this.getMenuTree(); //获取菜单树
	},
	mounted() {
		this.getMenuList(this.nowMenuID); //获取菜单列表
	},
	filters: {},
	computed: {},
	methods: {
		//添加菜单/按钮
		addMenu(menuType) {
			this.$refs.menuEdit.addMenu(menuType, this.nowMenuID);
		},
		//删除菜单/按钮
		delMenu(menuId) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.tableLoading = true;
					this.$axios
						.get(this.$api.meunDel, {
							params: {
								menuId: menuId
							}
						})
						.then(res => {
							if (res.code == this.$code.success) {
								this.refreshMenu(this.nowMenuID); //删除成功后刷新菜单数据
								this.successMessage("删除成功");
							} else {
								this.errorMessage(res.data);
								this.tableLoading = false;
							}
						})
						.catch(err => {
							console.log(err);
							this.tableLoading = false;
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
		},
		//修改菜单/按钮
		updateMenu(menu) {
			this.$refs.menuEdit.updateMenu(menu, this.nowMenuID);
		},
		//获取菜单列表
		getMenuList(id) {
			this.tableLoading = true;
			this.$axios
				.get(this.$api.meunList, {
					params: {
						parentId: id
					}
				})
				.then(res => {
					this.menus = res;
					this.tableLoading = false;
				})
				.catch(err => {
					console.log(err);
					this.tableLoading = false;
				});
		},
		//获取菜单树
		getMenuTree() {
			this.menuTreeLoading = true;
			this.$axios
				.get(this.$api.menuTree)
				.then(res => {
					let mentData = res;
					this.menuArray = mentData;
					let mentData2 = mentData.filter(item => {
						return item.menuType == "C";
					});
					this.menuTree = translateDataToTree(
						mentData2,
						"menuId",
						"parentId"
					);
					this.menuTreeLoading = false;
				})
				.catch(err => {
					console.log(err);
					this.menuTreeLoading = false;
				});
		},
		//菜单树点击事件
		menuTreeClick(index) {
			if (index == -1) {
				this.getMenuTree();
			}
			this.nowMenuID = Number(index);
			this.getMenuList(index);
			this.creatBread(index, []);
		},
		//二级面包屑
		creatBread(menuId, arr) {
			if (menuId != -1) {
				let obj = this.menuArray.filter(element => {
					return element.menuId == menuId;
				})[0];
				let params = {
					name: obj.title,
					menuId: obj.menuId
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
		}
	}
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