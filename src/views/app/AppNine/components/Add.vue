<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 10:40:23
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-29 09:16:00
-->
<template>
	<el-container class="email-add">
		<el-main>
			<el-container>
				<el-header height="46px" class="email-add-header">
					<div>
						<el-page-header content="写邮件"></el-page-header>
					</div>
				</el-header>
				<el-main>
					<div class="email-form">
						<el-form :model="form" ref="form" :rules="formRules" label-width="80px" class="demo-ruleForm">
							<el-form-item label="收件人" prop="to">
								<el-cascader
									placeholder
									:options="options"
									:props="cascaderProps"
									v-model="form.to"
									class="w100"
									filterable
								>
									<template slot-scope="{ node, data }">
										<span>{{ data.label }}</span>
										<span v-if="node.isLeaf">&lt;{{ data.value }}&gt;</span>
									</template>
								</el-cascader>
							</el-form-item>
							<el-form-item label="抄送人">
								<el-cascader
									placeholder
									:options="options"
									:props="cascaderProps"
									v-model="form.cc"
									class="w100"
									filterable
								></el-cascader>
							</el-form-item>
							<el-form-item label="密送人">
								<el-cascader
									placeholder
									:options="options"
									:props="cascaderProps"
									v-model="form.bcc"
									class="w100"
									filterable
								></el-cascader>
							</el-form-item>
							<el-form-item label="主题" prop="subject">
								<el-input v-model.number="form.subject" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="正文">
								<cms-tinymce v-model="form.html" :options="tinymceOptions"></cms-tinymce>
							</el-form-item>
							<el-form-item label="附件">
								<el-upload
									class="upload-demo"
									:action="action"
									:headers="headers"
									name="fields"
									:data="{folder:'email'}"
									:with-credentials="true"
									multiple
									:limit="1"
									:accept="accept"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
									:before-remove="beforeRemove"
									:on-success="onSuccess"
									:on-exceed="handleExceed"
									:file-list="fileList"
									:auto-upload="true"
									ref="email"
								>
									<el-button size="small" type="primary">点击上传附件</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png,word/excel/ppt/pdf文件，且不超过500mb</div>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<el-button size="small" @click="submitForm('form')">发送</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-main>
			</el-container>
		</el-main>
		<el-aside width="240px" class="aside-right">
			<el-tabs type="border-card" v-model="tabsOneActiveName" :stretch="true" class="h100 right-tabs">
				<el-tab-pane name="first" class="h100">
					<span slot="label">通讯录</span>
					<div class="h100">
						<el-scrollbar class="h100">
							<el-tree
								:data="options"
								:props="defaultProps"
								:default-expand-all="true"
								@node-click="handleNodeClick"
							></el-tree>
						</el-scrollbar>
					</div>
				</el-tab-pane>
				<el-tab-pane name="second" class="h100">
					<span slot="label">模&emsp;板</span>
					<div class="h100">
						<el-scrollbar class="h100">
							<div>布局字段</div>
						</el-scrollbar>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-aside>
	</el-container>
</template>

<script>
import { addObj } from "@/api/page/email";
import va from "@/rules/index.js";
import { getToken, csrfToken } from "@/utils/auth";
import cmsTinymce from "@/components/cms/cmsTinymce.vue";
export default {
	components: {
		"cms-tinymce": cmsTinymce,
	},
	data() {
		//引入自定义验证规则
		let r_required_to = va.required("请填写收件人后再发送", "change");
		let r_required_subject = va.required("请填写填写主题");
		return {
			tabsOneActiveName: "first",
			form: {
				to: [],
				cc: [],
				bcc: [],
				subject: "",
				html: "",
				attachments: {
					// filename: "15150650vy41.jpg",
					// content: "2021“我向总理说句话”网民建言征集",
					// encoding: "",
					// path:
					// 	"http://xiaogan.gov.cn/u/cms/www/202012/15150650vy41.jpg",
					// contentType: "",
				},
			},
			value: "",
			tinymceOptions: {
				height: 460,
				menubar: [],
			},
			fileList: [],
			options: [
				{
					value: "zhinan",
					label: "研发部",
					children: [
						{
							value: "94648929@qq.com",
							label: "张三",
						},
						{
							value: "1185407718@qq.com",
							label: "李四",
						},
						{
							value: "847972489@qq.com",
							label: "王五",
						},
					],
				},
			],
			cascaderProps: {
				multiple: true,
				emitPath: false,
			},
			defaultProps: {
				children: "children",
				label: "label",
			},
			// 表单验证规则
			formRules: {
				to: [r_required_to],
				subject: [r_required_subject],
			},
		};
	},
	computed: {
		action() {
			return process.env.VUE_APP_SERVER_API + "/api/upload";
		},
		headers() {
			return {
				authorization: `Bearer ${getToken()}`,
				"x-csrf-token": csrfToken(),
			};
		},
		accept() {
			return "image/*,application/*,text/*,audio/*";
		},
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					addObj(this.form)
						.then((result) => {
							console.log(result);
							this.$message.success("发送成功");
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.form.attachments = {};
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 1 个文件，本次选择了 ${
					files.length
				} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			);
		},
		// eslint-disable-next-line no-unused-vars
		onSuccess(response, file, fileList) {
			console.log(response);
			this.form.attachments.filename = response.data.name;
			this.form.attachments.content = response.data.new_name;
			this.form.attachments.encoding = "";
			this.form.attachments.path =
				process.env.VUE_APP_SERVER_API + response.data.url;
			this.form.attachments.contentType = response.data.mime_type;
		},
		// eslint-disable-next-line no-unused-vars
		beforeRemove(file, fileList) {
			console.log(file);
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		handleNodeClick(data) {
			console.log(data);
		},
	},
};
</script>

<style scoped>
.email-add-header {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	height: 46px;
	padding: 0px 15px;
	line-height: 45px;
	border-bottom: 1px dashed #e7ecf3;
}

.email-add .right-tabs {
	border: 0;
	box-shadow: none;
}

.email-form {
	box-sizing: border-box;
	padding: 40px;
}
</style>