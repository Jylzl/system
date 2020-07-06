<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-02 10:11:54
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-02 10:55:37
--> 

<template>
	<div class="personal-box h100">
		<el-row :gutter="20" class="h100">
			<el-col :span="6" class="h100">
				<div class="grid-content bg-purple h100">
					<el-card class="box-card h100">
						<div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="18" class="h100">
				<div class="grid-content bg-purple h100">
					<el-tabs type="border-card" class="h100">
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-date"></i> 我的日程
							</span>
							<el-calendar v-model="value"></el-calendar>
						</el-tab-pane>
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-chat-line-round"></i> 消息中心
							</span>
							消息中心
						</el-tab-pane>
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-notebook-2"></i> 操作记录
							</span>
							操作记录
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: new Date()
		};
	}
};
</script>

<style scoped>
.personal-box {
	background-color: #f7f7f9;
}
</style>