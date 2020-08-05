<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-16 17:18:15
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-04 21:44:04
 -->
<template>
	<el-form
		:label-position="o_formAttribute.labelPosition"
		:label-width="o_formAttribute.labelWidth + 'px'"
		:label-suffix="o_formAttribute.labelSuffix"
		:size="o_formAttribute.formSize"
		:rules="rules"
		class="d-form"
	>
		<el-row :gutter="o_formAttribute.colSpacing">
			<el-col v-for="(item) in a_myArray" :span="item.span" :key="item.id" :data-id="item.id">
				<el-form-item :label="item.label" :required="item.check" :rules="item.rules">
					<component :is="item.component" :data="item"></component>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>


<script>
import dCascader from "@/components/dform/field/dCascader.vue";
import dCheckbox from "@/components/dform/field/dCheckbox.vue";
import dColorPicker from "@/components/dform/field/dColorPicker.vue";
import dDate from "@/components/dform/field/dDate.vue";
import dDateTime from "@/components/dform/field/dDateTime.vue";
import dInput from "@/components/dform/field/dInput.vue";
import dMap from "@/components/dform/field/dMap.vue";
import dNumber from "@/components/dform/field/dNumber.vue";
import dRadio from "@/components/dform/field/dRadio.vue";
import dRate from "@/components/dform/field/dRate.vue";
import dRichText from "@/components/dform/field/dRichText.vue";
import dSelect from "@/components/dform/field/dSelect.vue";
import dSlider from "@/components/dform/field/dSlider.vue";
import dSwitch from "@/components/dform/field/dSwitch.vue";
import dTime from "@/components/dform/field/dTime.vue";
import dUpload from "@/components/dform/field/dUpload.vue";
export default {
	name: "d-form",
	components: {
		"d-cascader": dCascader,
		"d-checkbox": dCheckbox,
		"d-colorPicker": dColorPicker,
		"d-date": dDate,
		"d-dateTime": dDateTime,
		"d-input": dInput,
		"d-map": dMap,
		"d-number": dNumber,
		"d-radio": dRadio,
		"d-rate": dRate,
		"d-richText": dRichText,
		"d-select": dSelect,
		"d-slider": dSlider,
		"d-switch": dSwitch,
		"d-time": dTime,
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
	data() {
		return {
			a_myArray: this.myArray,
			o_formAttribute: this.formAttribute,
			rules: {},
		};
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