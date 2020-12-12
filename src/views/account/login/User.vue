<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-10-15 10:55:54
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-12 17:39:12
-->
<template>
	<div class="card-box">
		<el-form :model="form" ref="form" :rules="rules" class="demo-ruleForm">
			<el-form-item prop="user">
				<el-autocomplete
					v-model="form.user"
					:fetch-suggestions="querySearch"
					placeholder="手机号/邮箱/用户名"
					:trigger-on-focus="false"
					@select="handleSelect"
					style="width:100%;"
					:maxlength="20"
					@keyup.enter.native="submitForm('form')"
				>
					<template slot-scope="{ item }">
						<span class="fl">{{ item.value }}</span>
						<el-button
							type="text"
							icon="el-icon-close"
							class="fr"
							title="删除账号信息"
							@click="delLocalAccount(item.value)"
						></el-button>
					</template>
				</el-autocomplete>
			</el-form-item>
			<el-form-item prop="pswd">
				<div class="show-pswd">
					<el-input
						:type="isPswd?'password':'text'"
						v-model.number="form.pswd"
						autocomplete="off"
						placeholder="密码"
						maxlength="16"
						class="show-pswd-input"
						@keyup.enter.native="submitForm('form')"
					></el-input>
					<el-button
						type="text"
						class="show-pswd-btn"
						title="显示密码"
						:icon="isPswd?'icon iconfont icon-icon_yulan':'icon iconfont icon-miwen'"
						@mousedown.native="isPswd = false"
						@mouseup.native="isPswd = true"
					></el-button>
				</div>
			</el-form-item>
			<el-form-item class="m-0" style="margin:0;">
				<div class="forget-password">
					<el-checkbox
						v-model="form.remember"
						@change="checkCookies"
						:true-label="1"
						:false-label="0"
					>记住密码</el-checkbox>
					<router-link to="/forget">忘记密码？</router-link>
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
import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";
import tripledes from "crypto-js/tripledes";
import va from "@/rules/index.js";
export default {
	data() {
		//引入自定义验证规则
		let r_user = va.required("用户名不能为空", "change");
		let r_pswd = va.required("密码不能为空");
		return {
			form: {
				grant_type: "password",
				user: "lizilong",
				pswd: "long1234",
				remember: true,
				code: "",
			},
			// 表单验证规则
			rules: {
				// 用户名验证
				user: [r_user],
				// 密码验证
				pswd: [r_pswd],
			},
			isPswd: true,
			landLoading: false,
			rememberUsers: [],
			landTimes: 0,
		};
	},
	computed: {},
	methods: {
		checkCookies() {
			if (!navigator.cookieEnabled) {
				this.$notify({
					title: "警告",
					message:
						"浏览器已禁止网站保存和读取Cookies数据，请打开后再试",
					type: "warning",
				});
				this.form.remember = false;
				return false;
			}
		},
		// 用户名输入框切换用户
		handleSelect(item) {
			this.form.pswd = item.pswd;
		},
		// 删除本地记录用户
		delLocalAccount(userName) {
			this.$confirm("此操作将从本地删除该用户信息, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.rememberUsers = this.rememberUsers.filter(
						(user) => user.value != userName
					);
					//加密用户信息，并存入cookies
					Cookies.set(
						"account",
						tripledes
							.encrypt(
								JSON.stringify(this.rememberUsers),
								process.env.VUE_APP_userSaveKey
							)
							.toString(),
						{
							expires: 7,
						}
					);
					this.successMessage("删除成功!");
					// 重置表单
					this.$refs["form"].resetFields();
				})
				.catch(() => {
					this.message("已取消删除");
				});
		},
		// 用户输入匹配
		querySearch(queryString, cb) {
			const rememberUsers = this.rememberUsers;
			let results =
				queryString == " "
					? rememberUsers
					: rememberUsers.filter(this.createFilter(queryString));
			// 调用 callback 返回建议列表的数据
			if (results.length > 0 && queryString === results[0].value) {
				this.form.pswd = results[0].pswd;
				this.form.remember = results[0].remember;
			} else {
				this.form.pswd = "";
			}
			cb(results);
		},
		createFilter(queryString) {
			return (rememberUser) => {
				return (
					rememberUser.value
						.toLowerCase()
						.indexOf(queryString.toLowerCase()) === 0
				);
			};
		},
		// 登录提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.landLoading = true;
					this.$store
						.dispatch("userLogin", this.form)
						.then((res) => {
							switch (res.code) {
								case this.$code.success:
									// 登录成功
									this.landSuccess();
									break;
								case this.$code.fail:
									// 登录失败
									this.landFail(
										"warning",
										"用户或密码名错误!"
									);
									break;
								default:
									// 登录失败
									this.landFail("warning", res.msg + "!");
									break;
							}
						})
						.catch(() => {
							// 登录失败
							this.landFail();
						});
				} else {
					return false;
				}
			});
		},
		landSuccess() {
			this.$store
				.dispatch("setRouters")
				.then((res) => {
					if (res.code == "200") {
						//登录成功后，先清除旧用户信息，然后判断用户是否勾选记住密码，是则将用户信息插入数组，否则仅记住用户名，然后将数组加密后存入cookies
						this.rememberUsers = this.rememberUsers.filter(
							(user) => user.value != this.form.user
						);
						// 默认记录5条用户信息，
						if (this.rememberUsers.length > 4) {
							this.rememberUsers = this.rememberUsers.splice(
								this.rememberUsers.length - 4,
								4
							);
						}
						if (this.form.remember) {
							this.rememberUsers.push({
								value: this.form.user,
								pswd: this.form.pswd,
							});
						} else {
							this.rememberUsers.push({
								value: this.form.user,
								pswd: "",
							});
						}
						//加密用户信息，并存入cookies
						Cookies.set(
							"account",
							tripledes
								.encrypt(
									JSON.stringify(this.rememberUsers),
									process.env.VUE_APP_userSaveKey
								)
								.toString(),
							{
								expires: 7,
							}
						);
						//登录成功手动清除cookies记录的登录次数
						Cookies.remove("landingTimes");
						this.$notify({
							title: "登录成功",
							message: "欢迎进入后台管理系统",
							type: "success",
							showClose: true,
						});
						// 重置登录样式
						this.landLoading = false;
						// 登录成功跳转主页
						this.$router.push({
							name: "work",
						});
					} else {
						this.landFail();
					}
				})
				.catch(() => {
					this.landFail();
				});
		},
		//登陆失败
		landFail(type, msg) {
			this.landLoading = false;
			// 登陆错误时记录次数
			Cookies.set(
				"landingTimes",
				Cookies.get("landingTimes")
					? Number(Cookies.get("landingTimes")) + 1
					: 1,
				{
					expires: 1,
				}
			);
			if (type) {
				this.message(msg, type);
			} else {
				this.warningMessage("登录失败");
			}
		},
	},
};
</script>


<style scoped>
.card-box {
	box-sizing: border-box;
	padding-top: 20px;
}

.forget-password {
	box-sizing: border-box;
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
	height: 20px;
	line-height: 20px;
	margin-bottom: 18px;
	font-size: 14px;
}

.show-pswd,
.get-code {
	position: relative;
	height: 40px;
	width: 100%;
}

.show-pswd-input,
.get-code-input {
	position: absolute;
	box-sizing: border-box;
	width: 100%;
}

.show-pswd-input input,
.get-code-input input {
	padding-right: 100px;
}

.show-pswd-btn,
.get-code-btn {
	position: absolute;
	right: 12px;
	z-index: 10;
}

.show-pswd-btn {
	font-size: 20px;
	padding-top: 9px;
	padding-bottom: 9px;
}
</style>