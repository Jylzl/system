<!--
 * @Description: 登录页
 * @Author: haoran
 * @Date: 2020-04-30 14:48:03
 * @LastAuthor: lizlong
 * @lastTime: 2020-10-16 10:28:01
 -->
<template>
	<div class="land-box">
		<div class="land-box-center">
			<div class="left">
				<img :src="imgUrl" draggable="false" />
			</div>
			<div class="right">
				<div class="logo">{{sysInf.title}}</div>
				<div class="land-form">
					<el-steps :active="1" simple>
						<el-step title="步骤" icon="el-icon-edit"></el-step>
						<el-step title="步骤" icon="el-icon-upload"></el-step>
						<el-step title="步骤" icon="el-icon-picture"></el-step>
					</el-steps>
					<div>1</div>
				</div>
			</div>
		</div>
		<div class="sys-version">版本：v_{{sysInf.version}}</div>
	</div>
</template>
<script>
const defaultSettings = require("@/settings.js");

export default {
	name: "Login",
	components: {},
	data() {
		return {
			imgUrl: require("@/assets/img/account/land_bg_center.png"),
			activeName: "password",
		};
	},
	computed: {
		sysInf() {
			return defaultSettings;
		},
	},
};
</script>

<style scoped>
.land-box {
	display: flex;
	width: 100%;
	height: 100%;
	background: url(../../../assets/img/account/land_bg.png);
	align-items: center;
	justify-content: center;
	background-size: cover;
}

.land-box-center {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-sizing: border-box;
	width: 1160px;
	height: 542px;
}

.land-box-center > .left,
.land-box-center > .left img {
	display: block;
	width: 679px;
	height: 542px;
}

.land-box-center > .right {
	width: 481px;
	height: 542px;
	background-color: #fff;
}

.logo {
	box-sizing: border-box;
	height: 150px;
	padding-top: 50px;
	font-size: 28px;
	font-weight: bold;
	text-align: center;
	line-height: 100px;
	color: #409eff;
}

.land-form {
	box-sizing: border-box;
	padding: 20px 60px 0 60px;
}

.three-land {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60px;
	text-align: right;
	margin-top: 22px;
}

.sys-version {
	position: fixed;
	right: 20px;
	bottom: 20px;
	font-size: 12px;
	color: #909399;
}
</style>