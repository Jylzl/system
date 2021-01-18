<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-15 15:35:58
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-08 11:27:15
-->
<template>
	<div class="content-list">
		<section class="search-header-container">
			<el-form
				:inline="true"
				:model="formInline"
				label-suffix=":"
				class="top-form-inline"
				size="small"
			>
				<el-form-item label="创建方式">
					<el-select v-model="formInline.formSource" placeholder="创建方式" style="width: 126px;" clear>
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in formSourceOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序方式">
					<el-select v-model="formInline.order" placeholder="排序方式" style="width: 126px;" clear>
						<el-option label="默认排序" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in orderOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容类型">
					<el-select v-model="formInline.contentType" placeholder="内容类型" style="width: 126px;" clear>
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in contentTypeOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容状态">
					<el-select v-model="formInline.auditStatus" placeholder="内容状态" style="width: 126px;" clear>
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in auditStatusOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formInline.appTitle" placeholder="请输入标题" clear>
						<el-button slot="append" type="primary" icon="el-icon-search"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogVisible = true">高级搜索</el-button>
				</el-form-item>
			</el-form>
		</section>
		<section class="content-table-container">
			<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
				<ul class="ct-wrap">
					<li class="ct-box" v-for="i in contentList" :key="i">
						<div class="ct-box-header">
							<div class="box-header-left">
								<el-checkbox :label="i">{{i}}.雷军见李嘉诚都说了些啥</el-checkbox>
							</div>
							<div class="box-header-right">
								<div class="ct-inf-item">
									<span>创建人:</span>
									<span>system</span>
								</div>
								<div class="ct-inf-item">
									<span>创建时间:</span>
									<span>2019-09-05 10:34:02</span>
								</div>
								<div class="ct-inf-item">
									<span>ID:</span>
									<span>2578</span>
								</div>
								<div class="ct-inf-item">
									<span>模型:</span>
									<span>新闻</span>
								</div>
								<div class="ct-inf-item">
									<span>访问量:</span>
									<span>21</span>
								</div>
								<div class="ct-inf-item">
									<span>访问人数:</span>
									<span>11</span>
								</div>
								<div class="ct-inf-item">
									<span>评论数:</span>
									<span>9</span>
								</div>
								<div class="ct-inf-item">
									<span>点赞数:</span>
									<span>19</span>
								</div>
							</div>
						</div>
						<div class="ct-box-footer">
							<div class="box-footer-left">
								<el-tag size="small">待审核</el-tag>
							</div>
							<div class="box-footer-right">
								<el-button
									type="text"
									icon="el-icon-edit"
									@click="toLink('/page/content_details',{id:i,type:'edit'})"
								>编辑</el-button>
								<el-button type="text" icon="el-icon-s-promotion">发布</el-button>
								<el-button type="text" icon="el-icon-s-data">置顶</el-button>
								<el-button type="text" icon="el-icon-link">下线</el-button>
								<el-button type="text" icon="el-icon-delete">删除</el-button>
								<el-button type="text" icon="el-icon-camera">预览</el-button>
								<el-button type="text" icon="el-icon-view">浏览</el-button>
								<el-button type="text" icon="el-icon-document-copy">复制</el-button>
								<el-button type="text" icon="el-icon-rank">移动</el-button>
								<el-dropdown class="m-l-10" size="small">
									<span class="el-dropdown-link">
										<el-button type="text" icon="el-icon-more" size="small">操作</el-button>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<el-button type="text" icon="el-icon-edit" size="small">推送至信息公开</el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button type="text" icon="el-icon-edit" size="small">推送政务新媒体</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</li>
				</ul>
			</el-checkbox-group>
			<div class="ct-footer">
				<div class="ct-footer-left">
					<el-form
						:inline="true"
						:model="formInline"
						label-suffix=":"
						class="top-form-inline"
						size="mini"
					>
						<el-form-item>
							<el-checkbox
								:indeterminate="isIndeterminate"
								v-model="checkAll"
								@change="handleCheckAllChange"
							>全选</el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-dropdown>
								<el-button type="primary">改变状态</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-link">初稿</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-s-promotion">发布</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete">草稿</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete">下线</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-form-item>
						<el-form-item>
							<el-dropdown size="small">
								<el-button type="primary">改变类型</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-link" size="small">热门</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">取消热门</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">头条</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">取消头条</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">焦点</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">取消焦点</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-form-item>
						<el-form-item>
							<el-dropdown size="small">
								<el-button type="primary">内容操作</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-document-copy" size="small">复制</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-document-remove" size="small">移动</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-form-item>
					</el-form>
				</div>
				<div class="ct-footer-right">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="page.currentPage"
						:page-sizes="page.pageSizes"
						:page-size="page.pageSize"
						:total="page.total"
						layout="total, sizes, prev, pager, next, jumper"
					></el-pagination>
				</div>
			</div>
		</section>
		<el-dialog title="高级搜索" :visible.sync="dialogVisible" width="30%">
			<div>
				<el-form
					:model="formInline"
					label-suffix=":"
					label-width="80px"
					class="top-form-inline"
					size="small"
				>
					<el-form-item label="创建方式">
						<el-select v-model="formInline.formSource" placeholder="创建方式" class="w100">
							<el-option label="全部" value></el-option>
							<el-option :label="o.label" :value="o.value" v-for="o in formSourceOptions" :key="o.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序方式">
						<el-select v-model="formInline.order" placeholder="排序方式" class="w100">
							<el-option label="默认排序" value></el-option>
							<el-option :label="o.label" :value="o.value" v-for="o in orderOptions" :key="o.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容类型">
						<el-select v-model="formInline.contentType" placeholder="内容类型" class="w100">
							<el-option label="全部" value></el-option>
							<el-option :label="o.label" :value="o.value" v-for="o in contentTypeOptions" :key="o.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容状态">
						<el-select v-model="formInline.auditStatus" placeholder="内容状态" class="w100">
							<el-option label="全部" value></el-option>
							<el-option :label="o.label" :value="o.value" v-for="o in auditStatusOptions" :key="o.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标题">
						<el-input v-model="formInline.appTitle" placeholder="请输入标题"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button
					type="primary"
					@click="dialogVisible = false"
					icon="el-icon-circle-check"
					size="small"
				>查 询</el-button>
				<el-button @click="dialogVisible = false" icon="el-icon-circle-close" size="small">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 400,
				pageSizes: [10, 20, 50, 100, 200],
			},
			contentList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			checkList: [],
			checkAll: false,
			isIndeterminate: false,
			formInline: {
				formSource: "",
				order: "",
				contentType: "",
			},
			value: null,
			dialogVisible: false,
			formSourceOptions: [
				{
					label: "后台发布",
					value: 1,
				},
				{
					label: "信息公开推送",
					value: 2,
				},
				{
					label: "新媒体推送",
					value: 3,
				},
				{
					label: "前台投稿",
					value: 4,
				},
				{
					label: "采集",
					value: 5,
				},
			],
			auditStatusOptions: [
				{
					label: "待分配",
					value: 1,
				},
				{
					label: "待处理",
					value: 2,
				},
				{
					label: "处理中",
					value: 3,
				},
				{
					label: "已完成",
					value: 4,
				},
			],
			contentTypeOptions: [
				{
					label: "头条",
					value: 0,
				},
				{
					label: "焦点",
					value: 1,
				},
				{
					label: "要闻",
					value: 2,
				},
			],
			orderOptions: [
				{
					label: "发布时间降序",
					value: 0,
				},
				{
					label: "发布时间升序",
					value: 1,
				},
				{
					label: "创建时间降序",
					value: 2,
				},
				{
					label: "创建时间升序",
					value: 3,
				},
				{
					label: "总访问数降序",
					value: 4,
				},
				{
					label: "总访问数升序",
					value: 5,
				},
			],
		};
	},
	methods: {
		onSubmit() {
			console.log("onSubmit");
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		handleCheckAllChange(val) {
			this.checkList = val ? this.contentList : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.contentList.length;
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < this.contentList.length;
		},
		toLink(path, query) {
			this.$router.push({
				path,
				query,
			});
		},
	},
};
</script>

<style lang="scss">
.content-list {
	box-sizing: border-box;
	height: 100%;
	padding: 10px 15px;
	background-color: #fff;
}
.search-header-container {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border-radius: 4px;
	height: 46px;
	overflow: hidden;
	padding: 0 20px;
	background-color: #f0f0f0;
	.el-form-item {
		margin-bottom: 0 !important;
	}
}
.content-table-container {
	margin-top: 12px;
	.ct-wrap {
		.ct-box {
			width: 100%;
			background-color: #fff;
			min-height: 112px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			border: 1px solid #e8e8e8;
			border-radius: 4px;
			margin-bottom: 15px;
			overflow: hidden;
			.ct-box-header {
				display: flex;
				justify-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 30px 30px 30px 20px;
				.box-header-right {
					display: flex;
					justify-items: center;
					justify-content: flex-end;
					.ct-inf-item {
						min-width: 30px;
						line-height: 1;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						line-height: 16px;
						font-size: 13px;
						color: #999;
						margin: 0 6px;
						display: inline-block;
					}
				}
			}
			.ct-box-footer {
				display: flex;
				justify-items: center;
				justify-content: space-between;
				width: 100%;
				min-height: 36px;
				line-height: 36px;
				background-color: #f9f9f9;
				padding: 0 30px 0 50px;
				font-size: 12px;
				color: #777;
				box-sizing: border-box;
			}
		}
	}
	.ct-footer {
		box-sizing: border-box;
		display: flex;
		justify-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 6px 10px 6px 20px;
		background-color: #fff;
		line-height: 32px;
		.ct-footer-left {
			display: flex;
			justify-items: center;
		}
	}
}
</style>