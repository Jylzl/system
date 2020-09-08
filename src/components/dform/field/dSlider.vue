<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:33:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 09:05:58
 -->
<template>
	<div>
		<el-slider v-model="value"></el-slider>
	</div>
</template>

<script>
export default {
	name: "d-slider",
	data() {
		return {
			value: 0,
		};
	},
};
</script>