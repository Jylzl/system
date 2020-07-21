<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-20 09:31:27
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-21 14:53:14
--> 
<template>
	<div id="login">
		<el-button
			class="login-inputorbuttom login-bottom"
			type="primary"
			v-popover:popover
			@click="visible = !visible"
		>登 录</el-button>
		<!--验证码弹窗-->
		<el-popover popper-class="slidingPictures" ref="popover" trigger="manual" v-model="visible">
			<cms-puzzle :config="config" :value="value" @close="close"></cms-puzzle>
		</el-popover>
	</div>
</template>

<script>
import cmsPuzzle from "@/components/cms/cmsPuzzle.vue";
export default {
	components: {
		"cms-puzzle": cmsPuzzle
	},
	data() {
		return {
			value: false,
			visible: false,
			config: {
				width: 286,
				height: 170,
				accuracy: 5
			}
		};
	},
	methods: {
		// 关闭验证码
		close() {
			this.visible = false;
		}
	}
};
</script>

<style>
.slidingPictures {
	padding: 0;
	width: 300px;
	border-radius: 2px;
	z-index: 1998;
}
</style>