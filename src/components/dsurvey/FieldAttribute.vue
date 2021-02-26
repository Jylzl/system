<!--
 * @description: 字段属性配置
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-19 08:30:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 09:51:39
 -->
<template>
	<component
		:is="o_config.component? o_config.component +'-config':'d-config'"
		:config="o_config"
		:formConfig="o_formConfig"
		:components="a_components"
		@change="change"
	></component>
</template>

<script>
import dTitleConfig from "@/components/dsurvey/fieldconfig/dTitleConfig.vue";
import dCascaderConfig from "@/components/dsurvey/fieldconfig/dCascaderConfig.vue";
import dCheckboxConfig from "@/components/dsurvey/fieldconfig/dCheckboxConfig.vue";
import dInputConfig from "@/components/dsurvey/fieldconfig/dInputConfig.vue";
import dNumberConfig from "@/components/dsurvey/fieldconfig/dNumberConfig.vue";
import dRadioConfig from "@/components/dsurvey/fieldconfig/dRadioConfig.vue";
import dRateConfig from "@/components/dsurvey/fieldconfig/dRateConfig.vue";
import dRichTextConfig from "@/components/dsurvey/fieldconfig/dRichTextConfig.vue";
import dSelectConfig from "@/components/dsurvey/fieldconfig/dSelectConfig.vue";
import dUploadConfig from "@/components/dsurvey/fieldconfig/dUploadConfig.vue";
import dConfig from "@/components/dsurvey/fieldconfig/dConfig.vue";
export default {
	name: "field-attribute",
	components: {
		"d-title-config": dTitleConfig,
		"d-cascader-config": dCascaderConfig,
		"d-checkbox-config": dCheckboxConfig,
		"d-input-config": dInputConfig,
		"d-number-config": dNumberConfig,
		"d-radio-config": dRadioConfig,
		"d-rate-config": dRateConfig,
		"d-richText-config": dRichTextConfig,
		"d-select-config": dSelectConfig,
		"d-upload-config": dUploadConfig,
		"d-config": dConfig,
	},
	props: {
		config: {
			type: Object,
			default() {
				return {};
			},
		},
		components: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	watch: {
		config: {
			handler(val) {
				this.o_config = val;
			},
			immediate: true,
			deep: true,
		},
	},
	created() {},
	data() {
		return {
			o_config: this.config,
			a_components: this.components,
			o_formConfig: {
				labelPosition: "right",
				labelWidth: "84px",
				labelSuffix: "：",
				size: "small",
			},
		};
	},
	methods: {
		change() {
			this.$emit("change", this.o_config);
		},
	},
};
</script>