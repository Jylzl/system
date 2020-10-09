<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-10 14:05:07
 * @LastAuthor: lizlong
 * @lastTime: 2020-10-09 10:31:23
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
			value: "",
			options: {
				height: 600,
			},
		};
	},
};
</script>