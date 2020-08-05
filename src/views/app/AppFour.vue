<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-05 23:31:45
-->
<template>
	<div>
		<d-player :options="options"></d-player>
	</div>
</template>

<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
	components: {
		"d-player": VueDPlayer,
	},
	data() {
		return {
			options: {
				video: {
					url:
						"http://www.xiaogan.gov.cn/u/cms/www/201902/271026196oyj.mp4",
				},
			},
		};
	},
};
</script>