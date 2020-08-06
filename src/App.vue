<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 13:48:12
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 11:00:52
 -->
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
@import url(./assets/css/rest.min.css);
@import url(./assets/css/animate.css);
@import url(./assets/iconfont/iconfont.css);

@media (-webkit-max-device-pixel-ratio: 1) {
	::-webkit-scrollbar-track-piece {
		background-color: #ffffff;
	}

	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #c2c2c2;
		background-clip: padding-box;
		min-height: 28px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: #a0a0a0;
	}
}

html,
body,
#app {
	position: relative;
	height: 100%;
	width: 100%;
}

.w100 {
	width: 100%;
}

.h100 {
	height: 100%;
}

.m-b-20 {
	margin-bottom: 20px;
}

.m-t-20 {
	margin-top: 20px;
}

.m-l-10 {
	margin-left: 10px;
}
</style>
