<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:32:23
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 08:59:18
 -->
<template>
	<div>
		<el-switch v-model="value"></el-switch>
	</div>
</template>

<script>
export default {
	name: "d-switch",
	data() {
		return {
			value: true,
		};
	},
};
</script>