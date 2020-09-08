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
import dCascaderConfig from "@/components/dform/fieldconfig/dCascaderConfig.vue";
import dCheckboxConfig from "@/components/dform/fieldconfig/dCheckboxConfig.vue";
import dColorPickerConfig from "@/components/dform/fieldconfig/dColorPickerConfig.vue";
import dDateConfig from "@/components/dform/fieldconfig/dDateConfig.vue";
import dDateTimeConfig from "@/components/dform/fieldconfig/dDateTimeConfig.vue";
import dInputConfig from "@/components/dform/fieldconfig/dInputConfig.vue";
import dMapConfig from "@/components/dform/fieldconfig/dMapConfig.vue";
import dNumberConfig from "@/components/dform/fieldconfig/dNumberConfig.vue";
import dRadioConfig from "@/components/dform/fieldconfig/dRadioConfig.vue";
import dRateConfig from "@/components/dform/fieldconfig/dRateConfig.vue";
import dRichTextConfig from "@/components/dform/fieldconfig/dRichTextConfig.vue";
import dSelectConfig from "@/components/dform/fieldconfig/dSelectConfig.vue";
import dSliderConfig from "@/components/dform/fieldconfig/dSliderConfig.vue";
import dSwitchConfig from "@/components/dform/fieldconfig/dSwitchConfig.vue";
import dTimeConfig from "@/components/dform/fieldconfig/dTimeConfig.vue";
import dUploadConfig from "@/components/dform/fieldconfig/dUploadConfig.vue";
import dConfig from "@/components/dform/fieldconfig/dConfig.vue";
export default {
	name: "field-attribute",
	components: {
		"d-cascader-config": dCascaderConfig,
		"d-checkbox-config": dCheckboxConfig,
		"d-colorPicker-config": dColorPickerConfig,
		"d-date-config": dDateConfig,
		"d-dateTime-config": dDateTimeConfig,
		"d-input-config": dInputConfig,
		"d-map-config": dMapConfig,
		"d-number-config": dNumberConfig,
		"d-radio-config": dRadioConfig,
		"d-rate-config": dRateConfig,
		"d-richText-config": dRichTextConfig,
		"d-select-config": dSelectConfig,
		"d-slider-config": dSliderConfig,
		"d-switch-config": dSwitchConfig,
		"d-time-config": dTimeConfig,
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