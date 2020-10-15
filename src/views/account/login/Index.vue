<!--
 * @Description: 登录页
 * @Author: haoran
 * @Date: 2020-04-30 14:48:03
 * @LastAuthor: lizlong
 * @lastTime: 2020-10-15 15:50:19
 -->
<template>
	<div class="land-box">
		<div class="land-box-center">
			<div class="left">
				<img :src="imgUrl" draggable="false" />
			</div>
			<div class="right">
				<div class="logo">
					孝感市政府网站监测平台
					<span>V1.1.0</span>
				</div>
				<div class="land-form">
					<el-tabs v-model="activeName">
						<el-tab-pane label="账号登录" name="password">
							<userLogin />
						</el-tab-pane>
						<el-tab-pane label="免密登录" name="phone">
							<phoneLogin />
						</el-tab-pane>
					</el-tabs>
				</div>
				<div class="three-land">
					<div class="three-land-left">
						<el-link type="info">注册新账户</el-link>
					</div>
					<div class="three-land-right">
						<thirdLogin />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import userLogin from "./User";
import phoneLogin from "./Phone";
import thirdLogin from "./Third";
export default {
	name: "Login",
	components: {
		userLogin,
		phoneLogin,
		thirdLogin,
	},
	data() {
		return {
			imgUrl: require("@/assets/img/account/land_bg_center.png"),
			activeName: "password",
		};
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

.logo span {
	font-size: 12px;
	color: #909399;
}

.land-form {
	box-sizing: border-box;
	padding: 20px 60px 0 60px;
}

.three-land {
	box-sizing: border-box;
	box-sizing: border-box;
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60px;
	text-align: right;
	margin-top: 22px;
}
</style>