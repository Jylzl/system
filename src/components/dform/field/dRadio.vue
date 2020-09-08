<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:30:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 08:50:04
 -->
<template>
	<div>
		<el-radio v-model="radio" label="1">备选项</el-radio>
		<el-radio v-model="radio" label="2">备选项</el-radio>
	</div>
</template>

<script>
export default {
	name: "d-radio",
	data() {
		return {
			radio: "1",
		};
	},
};
</script>