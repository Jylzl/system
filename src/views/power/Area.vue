<!--
 * @description: 区域管理
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-11 08:33:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-29 11:27:51
 -->
<template>
	<el-container>
		<el-aside width="240px" class="aside-left">
			<div class="left-top">
				<el-button type="text" icon="el-icon-menu" @click="getAreaTree(false, -1);">顶级区域</el-button>
				<el-button type="text" icon="el-icon-refresh" @click="getAreaTree(false,nowAreaID)">刷新</el-button>
			</div>
			<div class="left-center" v-loading="treeLoading">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<el-tree
						:data="areaTree"
						:props="areaTreeProps"
						:default-expand-all="true"
						@node-click="areaTreeClick"
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
						<el-table :data="areas" stripe style="width: 100%;height:100%;" size="small">
							<el-table-column prop="code" label="区域编号" align="center" width="160px"></el-table-column>
							<el-table-column prop="name" label="区域名称" align="left"></el-table-column>
							<el-table-column prop="abbreviation" label="区域简称" align="left"></el-table-column>
							<el-table-column prop="desc" label="区域描述" align="left"></el-table-column>
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
				:model="areaForm"
				:rules="areaFormRules"
				ref="areaForm"
				label-width="100px"
				size="medium"
				label-suffix=":"
			>
				<el-row :gutter="20">
					<el-col :span="menuDialog.span">
						<el-form-item label="上级区域">
							<el-cascader
								v-model="areaForm.parent_id"
								:options="areaTree"
								:props="areaCascaderProps"
								:show-all-levels="false"
								clearable
								class="w100"
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="区域名称" prop="name">
							<el-input v-model="areaForm.name" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="区域简称" prop="abbreviation">
							<el-input v-model="areaForm.abbreviation" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.code">
						<el-form-item label="区域编号" prop="code">
							<el-input v-model="areaForm.code" maxlength="200"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.span">
						<el-form-item label="排序">
							<el-input-number v-model="areaForm.order_num" controls-position="right" class="w100"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="menuDialog.desc">
						<el-form-item label="区域描述" prop="desc">
							<el-input
								v-model="areaForm.desc"
								type="textarea"
								:rows="4"
								placeholder="请输入区域描述"
								maxlength="200"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveForm()" icon="el-icon-circle-check" size="small">保 存</el-button>
				<el-button @click="resetForm('areaForm')" icon="el-icon-circle-close" size="small">取 消</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>
<script>
import va from "@/rules/index.js";
import {
	addObj,
	delObj,
	fetchAreaTree,
	putObj,
	getArea,
} from "@/api/power/area";
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
					name: "顶级区域",
					id: -1,
				},
			],
			areas: [],
			menuArray: [],
			areaTree: [],
			nowAreaID: -1,
			// 表单信息
			menuDialog: {
				top: "15vh",
				width: "45%",
				type: "add",
				title: "新增",
				visible: false,
				span: 24,
			},
			areaForm: {
				parent_id: -1,
				name: "",
				abbreviation: "",
				code: "",
				desc: "",
				order_num: 0,
			},
			areaTreeProps: {
				children: "children",
				label: "abbreviation",
			},
			areaCascaderProps: {
				filterable: true,
				emitPath: false,
				checkStrictly: true,
				children: "children",
				label: "name",
				value: "id",
			},
			// 表单验证规则
			areaFormRules: {
				name: [r_required],
				abbreviation: [r_required],
				code: [r_required, r_checkChinese],
				order_num: [r_required, r_number],
				desc: [r_notRequired],
			},
		};
	},
	created() {
		this.getAreaTree(false, this.nowAreaID); //获取区域树
	},
	mounted() {},
	filters: {},
	computed: {},
	methods: {
		//
		beforeClose(done) {
			this.$refs["areaForm"].resetFields();
			done();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.menuDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["areaForm"].validate((valid) => {
				if (valid) {
					if (this.areaForm.parent_id == "") {
						this.areaForm.parent_id = -1;
					}
					if (this.menuDialog.areaForm == "add") {
						addObj(this.areaForm).then(() => {
							this.menuDialog.visible = false;
							this.getAreaTree(false, this.nowAreaID); //获取区域列表
							this.$message.success("添加成功");
						});
					} else {
						putObj(this.areaForm).then(() => {
							this.menuDialog.visible = false;
							this.getAreaTree(false, this.nowAreaID); //获取区域列表
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
			this.menuDialog.areaForm = "add";
			this.menuDialog.title = "新增";
			this.areaForm = {
				parent_id: Number(this.nowAreaID),
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
						this.getAreaList(this.nowAreaID); //获取区域列表
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
			this.menuDialog.areaForm = "update";
			this.menuDialog.title = "修改";
			this.areaForm = row;
		},
		//获取区域列表
		getAreaList(id) {
			this.tableLoading = true;
			getArea({
				parent_id: id,
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
			}).then((res) => {
				this.areas = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		//获取区域树
		getAreaTree(lazy, parent_id) {
			this.treeLoading = true;
			this.nowAreaID = parent_id;
			this.getAreaList(parent_id); //获取区域列表
			fetchAreaTree(lazy, -1).then((res) => {
				this.areaTree = res.data;
				this.treeLoading = false;
			});
		},
		//区域树点击事件
		areaTreeClick(index) {
			this.nowAreaID = index.id;
			this.getAreaList(index.id);
			// this.creatBread(index, []);
		},
		//二级面包屑
		creatBread(areaId, arr) {
			if (areaId != -1) {
				let obj = this.menuArray.filter((element) => {
					return element.id == areaId;
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
			this.getAreaList(); //获取角色列表
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getAreaList(); //获取角色列表
		},
	},
};
</script>