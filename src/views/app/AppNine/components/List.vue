<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 10:40:11
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 10:40:51
-->
<template>
	<el-main>
		<div class="right-top">
			<div class="right-top-left"></div>
			<div class="right-top-right">
				<el-button type="primary" icon="el-icon-edit" size="mini">写邮件</el-button>
			</div>
		</div>
		<div class="right-table-100" v-loading="tableLoading">
			<el-scrollbar wrap-class="scrollbar-wrapper">
				<div class="table-box">table</div>
			</el-scrollbar>
		</div>
		<div class="right-bottom">
			<div></div>
			<div class="list-paging"></div>
		</div>
	</el-main>
</template>