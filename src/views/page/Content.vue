<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-15 15:35:58
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-15 18:41:51
-->
<template>
	<div class="content-list">
		<section class="search-header-container">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
				<el-form-item label="来源">
					<el-select v-model="formInline.formSource" placeholder="来源" style="width: 126px;">
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in formSourceOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序方式">
					<el-select v-model="formInline.order" placeholder="排序方式" style="width: 126px;">
						<el-option label="默认排序" value></el-option>
						<el-option label="申请时间" value="applicationTime"></el-option>
						<el-option label="处理时间" value="delayDate"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请类型">
					<el-select v-model="formInline.requestType" placeholder="申请类型" style="width: 126px;">
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in requestTypeOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="处理状态">
					<el-select v-model="formInline.auditStatus" placeholder="审核状态" style="width: 126px;">
						<el-option label="全部" value></el-option>
						<el-option :label="o.label" :value="o.value" v-for="o in auditStatusOptions" :key="o.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formInline.appTitle" placeholder="请输入标题">
						<el-button slot="append" type="primary" icon="el-icon-search"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</section>
		<section class="content-table-container">
			<el-checkbox-group v-model="checkList">
				<ul class="ct-wrap">
					<li class="ct-box" v-for="i in 20" :key="i">
						<div class="ct-box-header">
							<div class="box-header-left">
								<el-checkbox :label="i">
                  []
                </el-checkbox>
								<span>标题{{i}}</span>
							</div>
						</div>
						<div class="ct-box-footer">
							<div class="box-footer-left">
								<el-tag size="small">待审核</el-tag>
							</div>
						</div>
					</li>
				</ul>
			</el-checkbox-group>
		</section>
	</div>
</template>
<script>
export default {
	data() {
		return {
			checkList: [],
			formInline: {},
			formSourceOptions: [
				{
					label: "信息公开",
					value: 1,
				},
				{
					label: "新媒体",
					value: 2,
				},
				{
					label: "后台",
					value: 3,
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
			requestTypeOptions: [
				{
					label: "公民",
					value: 0,
				},
				{
					label: "法人/其他组织",
					value: 1,
				},
			],
		};
	},
	methods: {
		onSubmit() {
			console.log("onSubmit");
		},
	},
};
</script>

<style lang="scss">
.content-list {
	height: 100%;
	background-color: #f7f7f9;
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
				box-sizing: border-box;
				padding: 30px 60px 30px 20px;
			}
			.ct-box-footer {
				width: 100%;
				min-height: 36px;
				line-height: 36px;
				background-color: #f9f9f9;
				padding: 0 50px;
				font-size: 12px;
				color: #777;
				box-sizing: border-box;
			}
		}
	}
}
</style>