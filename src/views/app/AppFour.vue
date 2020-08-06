<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 09:00:27
-->
<template>
	<div>
		<d-player :options="options" class="d-player-box"></d-player>
	</div>
</template>

<script>
let Hls = require("hls.js");
window.Hls = Hls;
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
	components: {
		"d-player": VueDPlayer,
	},
	data() {
		return {
			options: {
				theme: "#1476d1",
				video: {
					url:
						"http://www.xiaogan.gov.cn/u/cms/www/201902/271026196oyj.mp4",
					pic:
						"http://xiaogan.gov.cn/u/cms/www/201902/28091318ce87.png",
					// type: "hls",
				},
				// screenshot: true, // 开启截图
				contextmenu: [
					{
						text: "custom1",
						link: "https://github.com/DIYgod/DPlayer",
					},
					{
						text: "custom2",
						click: (player) => {
							console.log(player);
						},
					},
				],
			},
		};
	},
};
</script>


<style scoped>
.d-player-box {
	width: 600px;
	margin: 0 auto;
}
</style>