<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 09:13:47
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-30 11:05:08
-->
<template>
	<el-container>
		<el-main>
			<div class="right-top">
				<div class="right-top-left">
					<el-form :inline="true" :model="searchForm" size="mini" class="top-form-inline">
						<el-form-item prop="siteId">
							<el-select
								v-model="searchForm.siteId"
								placeholder="请选择站点"
								class="w100"
								@change="getColumnList(e)"
								clearable
							>
								<el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="columnId">
							<el-select
								v-model="searchForm.columnId"
								placeholder="请选择站点"
								class="w100"
								@change="getList"
								clearable
							>
								<el-option v-for="item in columnList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-input v-model="searchForm.articleTitle" maxlength="100" placeholder="文章标题"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getList">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="right-top-right">
					<el-button type="primary" icon="el-icon-upload" size="mini" @click="add">添加</el-button>
				</div>
			</div>
			<div class="right-table-100">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="h100" style="box-sizing:border-box;padding: 15px;">
						<el-table :data="tableData" border :loading="tableLoading" style="width: 100%">
							<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
							<el-table-column prop="articleTitle" label="文章标题">
								<template slot-scope="scope">
									<el-link
										:href="scope.row.url"
										target="_blank"
										:title="scope.row.articleTitle"
										v-if="scope.row.url"
									>{{scope.row.articleTitle}}</el-link>
									<el-link :underline="false" v-else>{{scope.row.articleTitle}}</el-link>
								</template>
							</el-table-column>
							<el-table-column prop="pubDate" label="发布时间" width="220" align="center"></el-table-column>
							<el-table-column label="操作" width="160" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										icon="el-icon-camera"
										title="预览"
										@click="view(scope.row.id)"
										circle
									></el-button>
									<el-button
										size="mini"
										type="danger"
										icon="el-icon-delete"
										title="删除"
										@click="del(scope.row.id)"
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
			:title="editDialog.title"
			:visible.sync="editDialog.visible"
			:top="editDialog.top"
			:width="editDialog.width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:before-close="beforeClose"
		>
			<div>
				<article class="article-view">
					<h1 class="article-title">{{article.articleTitle}}</h1>
					<div class="article-inf">
						<span v-if="article.pubDate">发布时间：{{article.pubDate}}</span>
						<span v-if="article.contentSource">来源：{{article.contentSource}}</span>
						<span v-if="article.views">阅读量：{{article.views}}</span>
					</div>
					<div class="article-text htmledit_views" v-html="article.content"></div>
				</article>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
import { getList as getSiteList } from "@/api/page/crawlerSite";
import { getList as getColumnList } from "@/api/page/crawlerColumn";
import { getList, delObj, getObj } from "@/api/page/crawlerContent";

export default {
	components: {},
	data() {
		return {
			socialType: [],
			siteList: [],
			columnList: [],
			page: {
				currentPage: 1,
				pageSize: 20,
				total: 0,
				pageSizes: [1, 20, 50, 100, 200],
			},
			tableLoading: false,
			tableData: [],
			editDialog: {
				top: "15vh",
				width: "65%",
				type: "add",
				title: "新增",
				visible: false,
				span: 12,
			},
			article: {},
			searchForm: {
				articleTitle: "",
				siteId: "",
				columnId: "",
			},
		};
	},
	computed: {},
	created() {
		this.getSiteList();
	},
	mounted() {},
	methods: {
		getSiteList() {
			getSiteList().then((res) => {
				this.siteList = res.data;
				this.searchForm.siteId =
					res.data.length > 0 ? res.data[0].id : "";
				this.getColumnList(this.searchForm.siteId);
			});
		},
		getColumnList(siteId) {
			getColumnList({ siteId }).then((res) => {
				this.columnList = res.data;
				this.searchForm.columnId =
					res.data.length > 0 ? res.data[0].id : "";
				this.getList();
			});
		},
		getList() {
			getList({
				currentPage: this.page.currentPage,
				pageSize: this.page.pageSize,
				siteId: this.searchForm.siteId,
				columnId: this.searchForm.columnId,
				articleTitle: this.searchForm.articleTitle,
			}).then((res) => {
				this.tableData = res.data.rows;
				this.page.total = res.data.count;
				this.tableLoading = false;
			});
		},
		add() {
			this.editDialog.type = "add";
			this.editDialog.title = "新增";
			this.editDialog.visible = true;
		},
		view(id) {
			this.editDialog.type = "view";
			this.editDialog.title = "预览";
			getObj(id).then((res) => {
				this.tableLoading = false;
				this.article = res.data;
				this.editDialog.visible = true;
				console.log(res);
			});
		},
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
						this.getList();
						if (res.code == 200) {
							this.$message.success(`成功删除当前数据`);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		beforeClose(done) {
			done();
		},
		// 分页
		handleSizeChange(val) {
			this.page.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.page.currentPage = val;
			this.getList();
		},
	},
};
</script>


<style>
@import url(../../../../assets/css/ck_htmledit_views.min.css);
.article-view {
	color: #333;
	font-size: 18px;
	font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "微软雅黑";
}
.article-view .article-title {
	text-align: center;
	line-height: 2.25;
	font-size: 26px;
	font-weight: bold;
}
.article-view .article-inf {
	margin-top: 30px;
	line-height: 28px;
	font-size: 16px;
	color: #999;
	text-align: center;
	background-color: #efefef;
}
.article-view .article-inf > span {
	margin: 0 10px;
}
.article-view .article-text {
	margin-top: 30px;
}
</style>