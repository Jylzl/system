<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-12 22:47:54
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-24 16:16:52
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
				<el-select v-model="o_config.component" placeholder="请选择字段类型" @change="componentChange">
					<el-option
						v-for="item in componentType"
						:key="item.id"
						:label="item.label"
						:value="item.component"
					></el-option>
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
			<el-form-item label="数值精度">
				<el-input-number
					v-model="o_config.precision"
					controls-position="right"
					:min="0"
					:max="10"
					:step="1"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="最小数值">
				<el-input-number
					v-model="o_config.min"
					controls-position="right"
					:step="10"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="最大数值">
				<el-input-number
					v-model="o_config.max"
					controls-position="right"
					:step="10"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="步进数值">
				<el-input-number
					v-model="o_config.step"
					controls-position="right"
					:step="10"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="默认数值">
				<el-input-number
					v-model="o_config.valueDefault"
					controls-position="right"
					:min="o_config.min"
					:step="o_config.step"
					:max="o_config.max"
					:precision="o_config.precision"
					class="w100"
					@change="$emit('change', o_config)"
				></el-input-number>
			</el-form-item>
			<el-form-item label="按钮位置" v-if="o_config.controls">
				<el-select
					v-model="o_config.controlsPosition"
					placeholder="请选择按钮位置"
					@change="$emit('change', o_config)"
				>
					<el-option label="右侧按钮" value="right"></el-option>
					<el-option label="两侧按钮" value="start-end"></el-option>
				</el-select>
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
					<el-form-item label="使用按钮">
						<el-switch v-model="o_config.controls" @change="$emit('change', o_config)"></el-switch>
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
			s_checkType: "",
			regexOptions: [
				{
					value: "required",
					label: "必填字段"
				},
				{
					value: "notRequired",
					label: "假必填字段"
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
		}
	},
	watch: {
		config: {
			handler(val, oldVal) {
				this.o_config = val;
			},
			immediate: true,
			deep: true
		}
	},
	filters: {},
	created() {},
	methods: {
		checkTypeChange() {
			this.o_config.rules = [va[this.s_checkType](this.o_config.label)];
			this.$emit("change", this.o_config);
		},
		componentChange() {
			delete this.o_config.type;
			this.$emit("change", this.o_config);
		}
	}
};
</script>
