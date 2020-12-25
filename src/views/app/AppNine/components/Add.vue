<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 10:40:23
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 11:37:20
-->
<template>
	<el-container class="email-add">
		<el-main>
			<div class="email-form">
				<el-form
					:model="numberValidateForm"
					ref="numberValidateForm"
					label-width="60px"
					class="demo-ruleForm"
				>
					<el-form-item label="收件人" prop="age">
						<el-cascader
							placeholder
							:options="options"
							:props="{ multiple: true }"
							class="w100"
							filterable
						></el-cascader>
					</el-form-item>
					<el-form-item label="抄送" prop="age">
						<el-cascader
							placeholder
							:options="options"
							:props="{ multiple: true }"
							class="w100"
							filterable
						></el-cascader>
					</el-form-item>
					<el-form-item label="主题" prop="age">
						<el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="正文" prop="age">
						<cms-tinymce v-model="value" :options="tinymceOptions"></cms-tinymce>
					</el-form-item>
					<el-form-item label="附件" prop="age">
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="3"
							:on-exceed="handleExceed"
							:file-list="fileList"
						>
							<el-button size="small" type="primary">点击上传附件</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png,word/excel/ppt/pdf文件，且不超过500mb</div>
						</el-upload>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="submitForm('numberValidateForm')">发送</el-button>
						<el-button size="small" @click="submitForm('numberValidateForm')">定时发送</el-button>
						<el-button size="small" @click="submitForm('numberValidateForm')">存草稿</el-button>
						<el-button size="small" @click="resetForm('numberValidateForm')">关闭</el-button>
					</el-form-item>
				</el-form>
			</div>
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
import cmsTinymce from "@/components/cms/cmsTinymce.vue";
export default {
	components: {
		"cms-tinymce": cmsTinymce,
	},
	data() {
		return {
			tabsOneActiveName: "first",
			numberValidateForm: {
				age: "",
			},
			value: "",
			tinymceOptions: {
				height: 460,
				menubar: [],
			},
			fileList: [
				{
					name: "food.jpeg",
					url:
						"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
				},
				{
					name: "food2.jpeg",
					url:
						"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
				},
			],
			options: [
				{
					value: "zhinan",
					label: "研发部",
					children: [
						{
							value: "shejiyuanze",
							label: "张三",
						},
						{
							value: "daohang",
							label: "李四",
						},
					],
				},
			],
			defaultProps: {
				children: "children",
				label: "label",
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert("submit!");
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
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${
					files.length
				} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			);
		},
		// eslint-disable-next-line no-unused-vars
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		handleNodeClick(data) {
			console.log(data);
		},
	},
};
</script>

<style scoped>
.email-add .right-tabs {
	border: 0;
	box-shadow: none;
}

.email-form {
	box-sizing: border-box;
	padding: 40px;
}
</style>