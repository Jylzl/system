<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:31:28
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 08:56:57
 -->
<template>
	<el-select v-model="value" placeholder="请选择" class="w100">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
	</el-select>
</template>

<script>
export default {
	name: "d-select",
	data() {
		return {
			options: [
				{
					value: "选项1",
					label: "黄金糕",
				},
				{
					value: "选项2",
					label: "双皮奶",
				},
				{
					value: "选项3",
					label: "蚵仔煎",
				},
				{
					value: "选项4",
					label: "龙须面",
				},
				{
					value: "选项5",
					label: "北京烤鸭",
				},
			],
			value: "",
		};
	},
};
</script>