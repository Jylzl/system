<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-12 22:47:54
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-21 08:44:10
 -->
<template>
	<div class="field-attribute">
		<el-form
			:model="o_config"
			:size="o_formConfig.size"
			:label-position="o_formConfig.labelPosition"
			:label-width="o_formConfig.labelWidth"
			:label-suffix="o_formConfig.labelSuffix"
		>
			<el-form-item label="组件类型">
				<el-select
					v-model="o_config.component"
					placeholder="请选择字段类型"
					@change="$emit('change', o_config)"
				>
					<el-option
						v-for="item in componentType"
						:key="item.id"
						:label="item.label"
						:value="item.component"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="可选组件" v-if="a_type.length">
				<el-select v-model="o_config.type" placeholder="请选择可选类型" @change="$emit('change', o_config)">
					<el-option v-for="(item,index) in a_type" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="字段标题">
				<el-input
					v-model="o_config.label"
					placeholder="请输入字段标题"
					maxlength="100"
					@input="$emit('input', o_config)"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="字段名称">
				<el-input
					v-model="o_config.prop"
					placeholder="请输入字段名称"
					maxlength="100"
					@input="$emit('input', o_config)"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="字段栅格">
				<el-input-number
					v-model="o_config.span"
					controls-position="right"
					:min="6"
					:step="2"
					:max="24"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="占位内容">
				<el-input
					v-model="o_config.placeholder"
					placeholder="请输入占位内容"
					maxlength="100"
					@input="$emit('input', o_config)"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="默认内容">
				<el-input
					v-model="o_config.valueDefault"
					placeholder="请输入默认内容"
					maxlength="100"
					@input="$emit('input', o_config)"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="最大长度">
				<el-input-number
					v-model="o_config.maxlength"
					controls-position="right"
					:min="0"
					:step="10"
					:max="3000"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item label="是否可见">
						<el-switch v-model="o_config.display" @change="$emit('change', o_config)"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否只读">
						<el-switch v-model="o_config.readonly" @change="$emit('change', o_config)"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示计数">
						<el-switch v-model="o_config.showWordLimit" @change="$emit('change', o_config)"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="字段校验">
						<el-switch v-model="o_config.check" @change="$emit('change', o_config)"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="校验类型" v-if="o_config.check">
				<el-select v-model="s_checkType" placeholder="请选择校验类型" @change="checkTypeChange">
					<el-option
						v-for="(item,index) in regexOptions"
						:label="item.label"
						:value="item.value"
						:key="index"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="校验正则" v-if="o_config.check && o_config.rules == '0'">
				<el-input
					v-model="o_config.regex"
					placeholder="请输入校验正则表达式"
					maxlength="100"
					@input="$emit('input', o_config)"
					clearable
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import va from "@/components/dform/rules.js";
export default {
	name: "",
	props: {
		config: {
			type: Object,
			default() {
				return {};
			}
		},
		formConfig: {
			type: Object,
			default() {
				return {};
			}
		},
		components: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			f_va: va,
			o_config: this.config,
			o_formConfig: this.formConfig,
			s_checkType: "d-switch-config",
			regexOptions: [
				{
					value: "notRequired",
					label: "标识必填字段"
				},
				{
					value: "required",
					label: "普通文本"
				},
				{
					value: "checkChinese",
					label: "非中文字符串"
				},
				{
					value: "englishStr",
					label: "英文字符串"
				},
				{
					value: "string",
					label: "数字或英文"
				},
				{
					value: "number",
					label: "整数"
				},
				{
					value: "double",
					label: "浮点数"
				},
				{
					value: "email",
					label: "邮箱"
				},
				{
					value: "mobile",
					label: "手机号码"
				},
				{
					value: "isURL",
					label: "url地址"
				},
				{
					value: "pswd",
					label: "8-16位英文数字密码"
				},
				{
					value: "0",
					label: "其他"
				}
			]
		};
	},
	computed: {
		componentType() {
			let components = [];
			this.components.map(items => {
				if (items.children) {
					items.children.map(item => {
						components.push(item);
					});
				}
			});
			return components;
		},
		a_type() {
			let typeOptions = [];
			if (this.o_config.typeOptions) {
				typeOptions = this.o_config.typeOptions;
			} else {
				typeOptions = [
					{
						label: "单行文本框",
						value: "text"
					},
					{
						label: "多行文本框",
						value: "textarea"
					},
					{
						label: "邮箱文本框",
						value: "email"
					},
					{
						label: "密码文本框",
						value: "password"
					}
				];
			}
			return typeOptions;
		}
	},
	watch: {
		config: {
			// eslint-disable-next-line no-unused-vars
			handler(val, oldVal) {
				this.o_config = val;
			},
			immediate: true,
			deep: true
		}
	},
	filters: {},
	methods: {
		checkTypeChange() {
			this.o_config.rules = [va[this.s_checkType](this.o_config.label)];
			this.$emit("change", this.o_config);
		}
	}
};
</script>
