<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 18:06:56
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
					<el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="type" label="字典类型" width="120" align="center">
								<template slot-scope="scope">{{scope.row.system == 1?'系统类':'业务类'}}</template>
							</el-table-column>
							<el-table-column prop="name" label="分类" width="220"></el-table-column>
							<el-table-column prop="description" label="描述"></el-table-column>
							<el-table-column prop="remarks" label="备注信息"></el-table-column>
							<el-table-column prop="created_at" label="创建时间" width="200" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="info"
										icon="el-icon-notebook-1"
										@click="getDictItem(scope.row.id)"
										title="字典项"
										circle
									></el-button>
									<el-button size="mini" type="primary" icon="el-icon-edit" title="编辑" circle></el-button>
									<el-button size="mini" type="danger" icon="el-icon-delete" title="删除" circle></el-button>
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
			:title="itemsDialog.title"
			:visible.sync="itemsDialog.visible"
			:top="itemsDialog.top"
			:width="itemsDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<Items :dictId="dictId"></Items>
		</el-dialog>
	</el-container>
</template>

<script>
import { getDict, getDictItemByType } from "@/api/system/dict";
import Items from "./components/Items.vue";

export default {
	components: {
		Items,
	},
	data() {
		return {
			type: "1",
			dictId: null,
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
		getDictItem(id) {
			this.dictId = id;
			this.itemsDialog.visible = true;
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