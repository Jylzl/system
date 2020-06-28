<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-28 09:23:17
 * @LastAuthor: lizlong
 * @lastTime: 2020-06-28 09:41:42
--> 
<template>
	<div>
		<el-input
			placeholder="请输入内容"
			v-model="input"
			class="input-with-select"
			:disabled="true"
			:clear="true"
		>
			<el-button slot="append" icon="el-icon-search" @click="selectClick"></el-button>
		</el-input>
		<el-dialog
			title="选择图标"
			:visible.sync="dialogVisible"
			width="30%"
			custom-class="icon-select"
			:before-close="handleClose"
		>
			<div>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="阿里图标" name="first">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
				</el-tabs>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: "111",
			dialogVisible: false,
			activeName: "second"
		};
	},
	methods: {
		selectClick() {
			this.dialogVisible = true;
			console.log(1);
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then(() => {
					done();
				})
				.catch(() => {});
		},
		handleClick(tab, event) {
			console.log(tab, event);
		}
	}
};
</script>


<style lang="scss">
.icon-select .el-dialog__body {
	padding: 0 20px;
}
</style>