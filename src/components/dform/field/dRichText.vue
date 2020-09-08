<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:29:53
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 09:49:59
 -->
<template>
	<component :is="b_data.type || 'cms-tinymce'"></component>
</template>

<script>
import cmsTinymce from "@/components/cms/cmsTinymce.vue";
import cmsNEditor from "@/components/cms/cmsTinymce.vue";

export default {
	name: "d-richText",
	components: {
		"cms-tinymce": cmsTinymce,
		"cms-neditor": cmsNEditor,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			b_data: this.data,
		};
	},
};
</script>