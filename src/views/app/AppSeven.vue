<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-10 19:59:33
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-30 09:54:44
-->
<template>
	<div>
		<el-button type="primary" @click="view">预览</el-button>
	</div>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfFonts from "@/assets/vfs/vfs_fonts.js";
// import pdfFonts from "@/assets/vfs/fzyt_vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
	data() {
		return {
			docDefinition: {
				pageSize: "A4",
				defaultStyle: {
					font: "方正小标宋简体",
				},
				content: [
					{
						table: {
							widths: ["*", "*", "*", "*"],
							body: [
								["word", "word", "word", "word"],
								[
									{ text: "方正小标宋简体", colSpan: 2 },
									"",
									"",
									{ text: "word", rowSpan: 3 },
								],
								[
									{ text: "word", colSpan: 2, rowSpan: 2 },
									"",
									"word",
									"",
								],
								["", "", "word", ""],
							],
						},
					},
				],
			},
		};
	},
	methods: {
		view() {
			pdfMake.fonts = {
				Roboto: {
					normal: "Roboto-Regular.ttf",
					bold: "Roboto-Medium.ttf",
					italics: "Roboto-Italic.ttf",
					bolditalics: "Roboto-Italic.ttf",
				},
				仿宋_GB2312: {
					normal: "FANGSONG_GB2312.ttf",
					bold: "FANGSONG_GB2312.ttf",
					italics: "FANGSONG_GB2312.ttf",
					bolditalics: "FANGSONG_GB2312.ttf",
				},
				方正小标宋简体: {
					normal: "FZXBSJW.ttf",
					bold: "FZXBSJW.ttf",
					italics: "FZXBSJW.ttf",
					bolditalics: "FZXBSJW.ttf",
				},
				楷体GB2312: {
					normal: "KAITI_GB2312.ttf",
					bold: "KAITI_GB2312.ttf",
					italics: "KAITI_GB2312.ttf",
					bolditalics: "KAITI_GB2312.ttf",
				},
				黑体: {
					normal: "KAITI_GB2312.ttf",
					bold: "KAITI_GB2312.ttf",
					italics: "KAITI_GB2312.ttf",
					bolditalics: "KAITI_GB2312.ttf",
				},
			};
			pdfMake.tableLayouts = {
				exampleLayout: {
					hLineWidth: function (i, node) {
						if (i === 0 || i === node.table.body.length) {
							return 0;
						}
						return i === node.table.headerRows ? 2 : 1;
					},
					// eslint-disable-next-line no-unused-vars
					vLineWidth: function (i) {
						return 0;
					},
					hLineColor: function (i) {
						return i === 1 ? "black" : "#aaa";
					},
					paddingLeft: function (i) {
						return i === 0 ? 0 : 8;
					},
					paddingRight: function (i, node) {
						return i === node.table.widths.length - 1 ? 0 : 8;
					},
				},
			};
			pdfMake.createPdf(this.docDefinition).open();
		},
	},
};
</script>