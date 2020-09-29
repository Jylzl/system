<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 14:54:28
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-29 14:03:45
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