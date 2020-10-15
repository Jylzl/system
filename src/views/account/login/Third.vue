<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-10-15 10:56:39
 * @LastAuthor: lizlong
 * @lastTime: 2020-10-15 15:17:36
-->
<template>
	<div>
		<el-link :underline="false" :href="threeLinks.sina">
			<icon name="icon_sina" :w="28" :h="28"></icon>
		</el-link>
		<el-link :underline="false" :href="threeLinks.github" class="m-l-10">
			<icon name="icon_github" :w="28" :h="28"></icon>
		</el-link>
		<el-link :underline="false" :href="threeLinks.qq" class="m-l-10">
			<icon name="icon_qq" :w="28" :h="28"></icon>
		</el-link>
		<el-link :underline="false" :href="threeLinks.weichat" class="m-l-10">
			<icon name="icon_weichat" :w="28" :h="28"></icon>
		</el-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			threeLinks: {
				sina: `${process.env.VUE_APP_SERVER_API}/passport/sina`,
				github: `${process.env.VUE_APP_SERVER_API}/passport/github`,
				qq: `${process.env.VUE_APP_SERVER_API}/passport/qq`,
				weichat: `${process.env.VUE_APP_SERVER_API}/passport/weichat`,
			},
		};
	},
};
</script>