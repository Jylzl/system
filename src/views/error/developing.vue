<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-18 15:18:49
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:21:55
-->
<template>
	<div class="errPage">
		<div class="developing-box">
			<div class="developing-svg">
				<svg width="256" height="256">
					<image
						xlink:href="@/assets/svg/illustrations_developing.svg"
						src="svg.png"
						width="256"
						height="256"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Page404",
	computed: {
		message() {
			return "您访问的页面不存在......";
		},
	},
};
</script>

<style lang="scss" scoped>
.errPage {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #fff;
}
</style>