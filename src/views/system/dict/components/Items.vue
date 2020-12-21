<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 17:01:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 18:09:04
-->
<template>
	<div class="dialog-box h100">
		<div class="box-top">
			<el-button type="primary" icon="el-icon-edit" size="mini">添加</el-button>
			<!-- <div class="box-top-left"></div>
			<div class="box-top-right"></div>-->
		</div>
		<div class="box-center">
			<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
				<el-table-column prop="dict_id" label="类型" width="80" align="center"></el-table-column>
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
	</div>
</template>

<script>
import { getDictItem } from "@/api/system/dictitem";
export default {
	name: "DictItems",
	props: {
		dictId: {
			type: Number,
		},
	},
	data() {
		return {
			tableLoading: false,
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizes: [5, 10, 20, 50],
			},
			tableData: [],
		};
	},
	created() {
		console.log(this.dictId);
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
				console.log(res);
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		update(row) {
			console.log(row);
		},
		del(id) {
			console.log(id);
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
</style>