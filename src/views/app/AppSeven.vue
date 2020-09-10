<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-10 19:59:33
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-11 00:48:54
-->
<template>
	<div>
		<el-button type="primary" @click="view">预览</el-button>
	</div>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import pdfFonts from "@/assets/vfs/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
	data() {
		return {
			docDefinition: {
				pageSize: "A4",
				defaultStyle: {
					font: "方正姚体",
				},
				content: [
					{
						layout: "lightHorizontalLines", // optional
						table: {
							// headers are automatically repeated if the table spans over multiple pages
							// you can declare how many rows should be treated as headers
							headerRows: 1,
							widths: ["*", "auto", 100, "*"],

							body: [
								["First", "Second", "Third", "The last one"],
								["Value 1", "Value 2", "Value 3", "Value 4"],
								[
									{ text: "Bold value", bold: true },
									"Val 2",
									"Val 3",
									"Val 4",
								],
							],
						},
					},
					// if you don't need styles, you can use a simple string to define a paragraph
					"烦烦烦+++++++DASDDADDDThis is a standard paragraph, using default style",
					// using a { text: '...' } object lets you set styling properties
					{
						text: "This paragraph will have a bigger font",
						fontSize: 15,
					},

					// if you set the value of text to an array instead of a string, you'll be able
					// to style any part individually
					{
						text: [
							"This paragraph is defined as an array of elements to make it possible to ",
							{
								text: "restyle part of it and make it bigger ",
								fontSize: 15,
							},
							"than the rest.",
						],
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
				方正姚体: {
					normal: "FZYTK.TTF",
					bold: "FZYTK.TTF",
					italics: "FZYTK.TTF",
					bolditalics: "FZYTK.TTF",
				},
			};
			pdfMake.createPdf(this.docDefinition).open();
		},
	},
};
</script>