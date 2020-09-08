<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:33:00
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 09:00:17
 -->
<template>
	<div>
		<el-color-picker v-model="color" show-alpha></el-color-picker>
	</div>
</template>
<script>
export default {
	name: "d-colorPicker",
	data() {
		return {
			color: "rgba(19, 206, 102, 0.8)",
		};
	},
};
</script>