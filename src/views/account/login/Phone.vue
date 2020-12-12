<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-10-15 10:56:50
 * @LastAuthor: lizlong
 * @lastTime: 2020-10-15 15:48:40
-->
<template>
	<div class="card-box">
		<el-form :model="form" ref="form" :rules="rules" class="demo-ruleForm">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item>
						<el-select v-model="form.areaCode" placeholder="请选择">
							<el-option
								style="min-width:180px;"
								v-for="item in areaCodes"
								:key="item.code"
								:label="item.code"
								:value="item.code"
							>
								<span class="fl">{{item.code}}</span>
								<span style="float: right; color: #8492a6; font-size: 13px">{{item.name}}</span>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item prop="phone">
						<el-input
							type="tel"
							v-model.number="form.phone"
							autocomplete="off"
							placeholder="手机号"
							maxlength="20"
							clearable
						></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item prop="verificationCode">
				<div class="get-code">
					<el-input
						type="text"
						v-model.number="form.verificationCode"
						autocomplete="off"
						placeholder="6位数字验证码"
						maxlength="8"
						class="get-code-input"
						@keyup.enter.native="submitForm('form')"
					></el-input>
					<el-button type="text" class="get-code-btn">获取验证码</el-button>
				</div>
			</el-form-item>
			<el-form-item style="margin:0;">
				<el-button
					type="primary"
					style="width:100%;"
					:disabled="landLoading"
					:icon="landLoading?'el-icon-loading':''"
					@click="submitForm('form')"
				>{{landLoading?'正在登录...':'登录'}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import va from "@/rules/index.js";

export default {
	data() {
		let r_phone = va.mobile();
		let r_verificationCode = va.verificationCode();
		return {
			form: {
				areaCode: "0086",
				phone: "",
				verificationCode: "",
			},
			landLoading: false,
			areaCodes: [
				{
					name: "中国大陆",
					code: "0086",
				},
				{
					name: "中国台湾",
					code: "0886",
				},
				{
					name: "中国香港",
					code: "0852",
				},
			],
			// 表单验证规则
			rules: {
				// 自定义手机号规则
				phone: [r_phone],
				// 自定义验证码
				verificationCode: [r_verificationCode],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.landLoading = true;
				} else {
					return false;
				}
			});
		},
	},
};
</script>
<style scoped>
.card-box {
	box-sizing: border-box;
	padding-top: 20px;
}

.get-code {
	position: relative;
	height: 40px;
	width: 100%;
}

.get-code-input {
	position: absolute;
	box-sizing: border-box;
	width: 100%;
}

.get-code-input input {
	padding-right: 100px;
}

.get-code-btn {
	position: absolute;
	right: 12px;
	z-index: 10;
}
</style>