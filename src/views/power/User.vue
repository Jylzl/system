<!--
 * @description: 菜单管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:55:44
 -->
<template>
	<el-container>
		<el-aside width="240px" class="aside-left">
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
						<el-table :data="menus" stripe style="width: 100%;height:100%;" size="small">
							<el-table-column prop="imageUrl" label="用户头像" width="120" align="center">
								<template slot-scope="scope">
									<el-avatar size="small" :src="scope.row.powUserInf.imageUrl"></el-avatar>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="用户名" align="left"></el-table-column>
							<el-table-column prop="powUserInf[realName]" label="真实姓名" align="left"></el-table-column>
							<el-table-column prop="powUserInf[phone]" label="手机号码" align="left"></el-table-column>
							<el-table-column prop="powUserInf[email]" label="邮箱号码" align="left"></el-table-column>
							<el-table-column prop="lastLoginTime" label="后登录时间" align="left"></el-table-column>
							<el-table-column prop="status" label="用户状态" align="left"></el-table-column>
							<el-table-column prop="loginCount" label="登录次数" align="left"></el-table-column>
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
			:title="userDialog.title"
			:visible.sync="userDialog.visible"
			:top="userDialog.top"
			:width="userDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<!-- 修改表单 -->
			<el-form
				:model="userForm"
				:rules="userFormRules"
				ref="userForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="userDialog.span">
						<div class="form-first">
							<div class="form-first-left">
								<el-form-item label="用户名" prop="name">
									<el-input
										v-model="userForm.name"
										maxlength="50"
										:disabled="userDialog.type == 'add'? false:true"
									></el-input>
								</el-form-item>
								<el-form-item label="真实姓名" prop="realName">
									<el-input v-model="userForm.powUserInf.realName" maxlength="50"></el-input>
								</el-form-item>
							</div>
							<div class="form-first-right">
								<el-upload
									class="avatar-uploader"
									:action="uploadAction"
									accept="image/png, image/jpeg"
									name="fields"
									:headers="uploadHeader"
									:with-credentials="true"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload"
								>
									<img
										v-if="userForm.powUserInf.imageUrl"
										:src="userForm.powUserInf.imageUrl"
										class="avatar"
									/>
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</div>
						</div>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="密码" :prop="userDialog.type == 'add'? 'pswd':'_pswd'">
							<el-input v-model="userForm.pswd" maxlength="32" show-password></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="身份证">
							<el-input v-model="userForm.powUserInf.idCard" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="手机号码">
							<el-input v-model="userForm.powUserInf.phone" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="邮箱号码">
							<el-input v-model="userForm.powUserInf.email" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="所在部门">
							<el-cascader
								v-model="userForm.deptId"
								:options="deptTree"
								:props="deptCascaderProps"
								:show-all-levels="false"
								clearable
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="userDialog.span">
						<el-form-item label="用户角色">
							<el-select v-model="userForm.roles" multiple placeholder="请选择用户角色" class="w100">
								<el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('userForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>
<script>
import { getToken, csrfToken } from "@/utils/auth";
import va from "@/rules/index.js";
import { Encrypt } from "@/utils/aes.js";
import { fetchDeptTree } from "@/api/power/dept";
import { addObj, delObj, putObj, getUser } from "@/api/power/user";
import { getRole } from "@/api/power/role";

export default {
	name: "menuList",
	components: {},
	data() {
		//引入自定义验证规则
		let r_required = va.required();
		let r_email = va.email();
		let r_mobile = va.mobile();
		let r_isCardNo = va.isCardNo();
		let r_pswd = va.pswd();
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
					name: "顶级菜单",
					id: -1,
				},
			],
			menus: [],
			menuArray: [],
			deptTree: [],
			nowDeptID: -1,
			roles: [],
			// 表单信息
			userDialog: {
				top: "15vh",
				width: "45%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			userForm: {
				name: "",
				pswd: "",
				deptId: "",
				roles: "",
				powUserInf: {
					realName: "",
					idCard: "",
					phone: "",
					qq: "",
					email: "",
					github: "",
					imageUrl: "",
				},
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
			userFormRules: {
				name: [r_required, r_checkChinese],
				realName: [r_required],
				pswd: [r_required, r_pswd],
				_pswd: [r_pswd],
				idCard: [r_required, r_isCardNo],
				phone: [r_required, r_mobile],
				email: [r_required, r_email],
				deptId: [r_required],
				roles: [r_required],
			},
		};
	},
	created() {
		this.getDeptTree(false, this.nowDeptID); //获取菜单树
		getRole().then((res) => {
			this.roles = res.data;
		});
	},
	mounted() {},
	filters: {},
	computed: {
		uploadHeader() {
			const token = getToken() || localStorage.getItem("access_token"); //登录标示
			const csrf_token = csrfToken();
			return {
				authorization: "Bearer " + token,
				"x-csrf-token": csrf_token,
			};
		},
		uploadAction() {
			return process.env.VUE_APP_SERVER_API + "/api/upload";
		},
	},
	methods: {
		//
		beforeClose(done) {
			this.$refs["userForm"].resetFields();
			done();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.userDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["userForm"].validate((valid) => {
				if (valid) {
					// 密码加密
					if (
						this.userForm.pswd != undefined &&
						this.userForm.pswd.length > 0
					) {
						this.userForm.pswd = Encrypt(
							this.userForm.pswd,
							process.env.VUE_APP_aesKey,
							process.env.VUE_APP_ivKey
						);
					}
					if (this.userDialog.type == "add") {
						addObj(this.userForm).then(() => {
							this.userDialog.visible = false;
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.userForm).then(() => {
							this.userDialog.visible = false;
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
			if (this.deptTree.length == 0) {
				this.$message({
					showClose: true,
					message: "请先创建一个部门",
					type: "warning",
				});
				return false;
			} else if (this.roles.length == 0) {
				this.$message({
					showClose: true,
					message: "请先创建一个角色",
					type: "warning",
				});
				return false;
			}
			this.userDialog.visible = true;
			this.userDialog.type = "add";
			this.userDialog.title = "新增";

			this.userForm = {
				name: "",
				pswd: "",
				deptId: "",
				roles: "",
				powUserInf: {
					realName: "",
					idCard: "",
					phone: "",
					qq: "",
					email: "",
					github: "",
					imageUrl: "",
				},
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
						this.getUserList(this.nowDeptID); //获取菜单列表
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
			this.userDialog.visible = true;
			this.userDialog.type = "update";
			this.userDialog.title = "修改";
			this.userForm = row;
			this.userForm.roles = row.roles.map((item) => {
				return item.id;
			});
			console.log(row);
		},
		//获取菜单列表
		getUserList(id) {
			this.tableLoading = true;
			getUser({
				deptId: id,
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.menus = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		//获取菜单树
		getDeptTree(lazy, parentId) {
			this.treeLoading = true;
			this.nowDeptID = parentId;
			this.getUserList(parentId); //获取用户列表
			fetchDeptTree(lazy, -1).then((res) => {
				this.deptTree = res.data;
				this.treeLoading = false;
			});
		},
		//菜单树点击事件
		deptTreeClick(index) {
			this.nowDeptID = index.id;
			this.getUserList(index.id);
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
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getRoleList(); //获取角色列表
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getRoleList(); //获取角色列表
		},
		// eslint-disable-next-line no-unused-vars
		handleAvatarSuccess(res, file) {
			// this.imageUrl = URL.createObjectURL(file.raw);
			this.userForm.powUserInf.imageUrl =
				process.env.VUE_APP_SERVER_API + res.data.url;
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isLt2M;
		},
	},
};
</script>

<style>
.form-first {
	display: flex;
	justify-content: space-between;
}

.form-first-left {
	width: calc(100% - 114px);
}

.form-first-right {
	width: 94px;
}

.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 94px;
	height: 94px;
	line-height: 94px;
	text-align: center;
}

.avatar {
	width: 94px;
	height: 94px;
	display: block;
}
</style>