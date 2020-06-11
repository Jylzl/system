<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-15 14:40:36
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-24 16:03:01
 -->
<template>
	<el-input-number
		v-model="o_data.value"
		:name="o_data.prop"
		:min="o_data.min"
		:max="o_data.max"
		:step="o_data.step"
		:step-strictly="o_data.stepStrictly"
		:precision="o_data.precision"
		:controls="o_data.controls"
		:controls-position="o_data.controlsPosition"
		:placeholder="o_data.placeholder"
		:disabled="o_data.disabled"
		class="w100"
	></el-input-number>
</template>
<script>
export default {
	name: "d-number",
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	watch: {
		data: {
			handler(value) {
				this.o_data = value;
			},
			immediate: true
		}
	},
	data() {
		return {
			o_data: this.data
		};
	},
	methods: {}
};
</script>

<style scoped>
.w100 {
	width: 100%;
}
</style>