<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-10 14:05:07
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-04 18:19:14
--> 
<template>
	<div>
		<cms-tinymce v-model="value" :options="options"></cms-tinymce>
	</div>
</template>

<script>
import cmsTinymce from "@/components/cms/cmsTinymce.vue";
export default {
	components: {
		"cms-tinymce": cmsTinymce,
	},
	data() {
		return {
			value: "<p>111111</p>",
			options: {
				height: 600,
			},
		};
	},
};
</script>