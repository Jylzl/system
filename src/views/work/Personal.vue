<!--
 * @description: 个人中心
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-02 10:11:54
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-05 10:24:03
--> 

<template>
	<div class="personal-box h100">
		<el-row :gutter="20" class="h100">
			<el-col :span="6" class="h100">
				<div class="grid-content bg-purple h100">
					<el-card class="box-card h100">
						<div class="user-header">
							<div class="user-header-left">
								<el-avatar :src="user.pow_user_inf.image_url" :size="100"></el-avatar>
							</div>
							<div class="user-header-right">
								<h2>{{user.name}}</h2>
								<p>{{user.pow_user_inf.real_name}}</p>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="18" class="h100">
				<div class="grid-content bg-purple h100">
					<el-tabs v-model="activeName" type="border-card" class="h100">
						<el-tab-pane name="schedule">
							<span slot="label">
								<i class="el-icon-date"></i> 我的日程
							</span>
							<el-calendar v-model="value"></el-calendar>
						</el-tab-pane>
						<el-tab-pane name="news">
							<span slot="label">
								<i class="el-icon-chat-line-round"></i> 消息中心
							</span>
							消息中心
						</el-tab-pane>
						<el-tab-pane name="logs">
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
			value: new Date(),
			activeName: "schedule",
		};
	},
	watch: {
		searchPool(list) {
			this.initFuse(list);
		},
	},
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
	},
	created() {},
	mounted() {
		if (this.$route.query.type && this.$route.query.type != undefined) {
			this.activeName = this.$route.query.type;
		}
	},
};
</script>

<style scoped>
.personal-box {
	background-color: #f7f7f9;
}

.user-header {
	display: flex;
	justify-items: center;
	justify-content: flex-start;
}

.user-header .user-header-right {
	box-sizing: border-box;
	padding: 10px 0 10px 40px;
}

.user-header .user-header-right h2 {
	line-height: 48px;
	font-size: 28px;
	color: #666;
}

.user-header .user-header-right p {
	line-height: 32px;
	font-size: 18px;
	color: #999;
}
</style>