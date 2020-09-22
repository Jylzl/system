<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 14:54:28
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-22 17:08:36
 -->
<template>
	<div class="h100 router-box">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!-- <router-view></router-view> -->
	</div>
</template>

<style scoped>
.router-box {
	background-color: #fff;
}
</style>