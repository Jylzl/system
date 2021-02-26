<!--
 * @description: 动态表单设计器
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-16 17:18:15
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-17 16:01:45
 -->
<template>
	<el-form
		ref="form"
		:model="form"
		:label-position="o_formAttribute.labelPosition"
		:label-width="o_formAttribute.labelWidth + 'px'"
		:label-suffix="o_formAttribute.labelSuffix"
		:size="o_formAttribute.formSize"
		:rules="rules"
		class="d-survey"
	>
		<el-row :gutter="o_formAttribute.colSpacing">
			<el-col v-for="(item) in a_myArray" :span="item.span" :key="item.id" :data-id="item.id">
				<el-form-item :label="item.label" :required="item.check" :rules="item.rules">
					<div style="padding-left:10px;">
						<component :is="item.component" :data="item" :value="form[item.prop]"></component>
					</div>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item>
					<el-button
						type="primary"
						:size="o_formAttribute.formSize"
						icon="el-icon-circle-check"
						@click="saveForm()"
					>{{o_formAttribute.submitText|| '保 存'}}</el-button>
					<el-button
						:size="o_formAttribute.formSize"
						icon="el-icon-circle-close"
						@click="resetForm('form')"
					>{{o_formAttribute.resetText|| '重 置'}}</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
import dTitle from "@/components/dsurvey/field/dTitle.vue";
import dCascader from "@/components/dsurvey/field/dCascader.vue";
import dCheckbox from "@/components/dsurvey/field/dCheckbox.vue";
import dInput from "@/components/dsurvey/field/dInput.vue";
import dNumber from "@/components/dsurvey/field/dNumber.vue";
import dRadio from "@/components/dsurvey/field/dRadio.vue";
import dRate from "@/components/dsurvey/field/dRate.vue";
import dRichText from "@/components/dsurvey/field/dRichText.vue";
import dSelect from "@/components/dsurvey/field/dSelect.vue";
import dUpload from "@/components/dsurvey/field/dUpload.vue";
export default {
	name: "d-form",
	components: {
		"d-title": dTitle,
		"d-cascader": dCascader,
		"d-checkbox": dCheckbox,
		"d-input": dInput,
		"d-number": dNumber,
		"d-radio": dRadio,
		"d-rate": dRate,
		"d-richText": dRichText,
		"d-select": dSelect,
		"d-upload": dUpload,
	},
	props: {
		myArray: {
			type: Array,
			default() {
				return [];
			},
		},
		formAttribute: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	created() {
		this.myArray.map((item) => {
			this.form[item.prop] = item.defaultVal;
		});
	},
	data() {
		return {
			a_myArray: this.myArray,
			o_formAttribute: this.formAttribute,
			rules: {},
			form: {},
		};
	},
	methods: {
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.menuDialog.visible = false;
		},
		// 保存
		saveForm() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.$message(JSON.stringify(this.form));
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style scoped>
.d-form {
	box-sizing: border-box;
	width: 100%;
	padding: 20px 20px 5px 10px;
}
</style>