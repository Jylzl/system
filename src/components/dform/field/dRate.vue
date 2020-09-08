<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:33:49
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 09:09:54
 -->
<template>
	<div class="h-36">
		<el-rate v-model="value"></el-rate>
	</div>
</template>
<script>
export default {
	name: "d-rate",
	data() {
		return {
			value: null,
		};
	},
};
</script>

<style scoped>
.h-36 {
	display: flex;
	height: 36px;
	align-items: center;
}
</style>