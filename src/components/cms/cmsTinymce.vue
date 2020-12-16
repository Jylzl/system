<!--
 * @description: Tinymce编辑器组件
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-30 17:49:09
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:08:51
 -->
<template>
	<Editor v-model="html" api-key="udm8u7u1w88b8yqqt0czgf3glqzet1mnbt95at9wv8u6bib3" :init="init"></Editor>
</template>

<script>
import { getToken, csrfToken } from "@/utils/auth";
// eslint-disable-next-line no-unused-vars
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
//图标
import "tinymce/icons/default/icons";
//主题
import "tinymce/themes/silver";
//插件
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor"; // 作者
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize"; // 自动更改大小
import "tinymce/plugins/autosave"; // 自动保存
import "tinymce/plugins/bbcode";
import "tinymce/plugins/charmap"; // 特殊符号
import "tinymce/plugins/code"; // 代码
import "tinymce/plugins/codesample";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality"; // 设置编写方向
import "tinymce/plugins/emoticons"; // 表情
// import "tinymce/plugins/fullpage"; // 完整页面的文档属性
import "tinymce/plugins/fullscreen"; // 全屏
import "tinymce/plugins/help"; // 帮助
import "tinymce/plugins/hr"; // 水平线
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/imagetools"; // 图片工具
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime"; // 插入时间
// import "tinymce/plugins/legacyoutput"; // 输出HTML4
import "tinymce/plugins/link"; // 添加和修改链接
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/nonbreaking"; // 不间断空格
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak"; // 分页符
import "tinymce/plugins/paste"; // 粘贴
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/print"; // 打印
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save"; // 保存(ajax)
import "tinymce/plugins/searchreplace"; // 搜索
import "tinymce/plugins/spellchecker"; // 拼写检查
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/template"; // 插入模板
import "tinymce/plugins/textcolor"; //文本颜色|背景颜色
import "tinymce/plugins/textpattern";
import "tinymce/plugins/toc"; // 插入目录
import "tinymce/plugins/visualblocks"; // 隐藏块级区域开关
import "tinymce/plugins/visualchars"; // 隐藏字符串开关
import "tinymce/plugins/wordcount"; // 字数统计插件

export default {
	name: "cms-tinymce",
	components: {
		Editor,
	},
	props: {
		value: {
			type: String,
			default: "",
		},
		options: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			html: "",
			init: {
				cache_suffix: "?v=5.5.1",
				base_url: "/tinymce", // 从另一个位置加载主题和插件
				language_url: "/tinymce/langs/zh_CN.min.js", // 语言包的路径
				language: "zh_CN", // 语言
				branding: false,
				skin_url: "/tinymce/skins/ui/oxide", // skin路径
				emoticons_database_url:
					"/tinymce/plugins/emoticons/emojis.min.js",
				content_css:
					"/tinymce/skins/content/default/ck_htmledit_views.min.css",
				body_class: "htmledit_views",
				external_plugins: {
					powerpaste: "/tinymce/plugins/powerpaste/plugin.js",
					formatpainter: "/tinymce/plugins/formatpainter/plugin.js",
					a11ychecker: "/tinymce/plugins/a11ychecker/plugin.js",
				},
				plugins:
					"print preview powerpaste importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount a11ychecker imagetools textpattern noneditable help formatpainter charmap quickbars emoticons advtable",
				mobile: {
					plugins:
						"print preview powerpaste importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount a11ychecker textpattern noneditable help formatpainter charmap quickbars emoticons advtable",
				},
				menubar: "file edit view insert format tools table tc help",
				menu: {
					file: {
						title: "File",
						items: "newdocument restoredraft | preview  | print ",
					},
					edit: {
						title: "Edit",
						items: "undo redo | cut copy paste | selectall",
					},
					view: {
						title: "View",
						items:
							"code | visualaid visualchars visualblocks | preview fullscreen",
					},
					insert: {
						title: "Insert",
						items:
							"image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
					},
					format: {
						title: "Format",
						items:
							"bold italic underline strikethrough superscript subscript codeformat | blockformats fontformats fontsizes align lineheight | forecolor backcolor | formatpainter removeformat",
					},
					tools: {
						title: "Tools",
						items:
							"spellcheckerlanguage | spellchecker | wordcount | searchreplace",
					},
					table: {
						title: "Table",
						items:
							"inserttable tableprops deletetable row column cell",
					},
					tc: {
						title: "TinyComments",
						items: "addcomment showcomments deleteallconversations",
					},
					help: {
						title: "Help",
						items: "help",
					},
				},
				toolbar:
					"undo redo | formatselect | formatpainter a11ycheck | fontselect | fontsizeselect | bold italic underline strikethrough subscript superscript removeformat | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent indent2em lineheight | lists image media emoticons link charmap codesample table | bdmap | fullscreen",
				autosave_ask_before_unload: true,
				autosave_interval: "30s",
				autosave_prefix: "{path}{query}-{id}-",
				autosave_restore_when_empty: false,
				autosave_retention: "2m",
				image_advtab: true,
				link_list: [
					{ title: "My page 1", value: "http://www.tinymce.com" },
					{ title: "My page 2", value: "http://www.moxiecode.com" },
				],
				image_list: [
					{ title: "My page 1", value: "http://www.tinymce.com" },
					{ title: "My page 2", value: "http://www.moxiecode.com" },
				],
				image_class_list: [
					{ title: "None", value: "" },
					{ title: "Some class", value: "class-name" },
				],
				importcss_append: true,
				templates: [
					{
						title: "New Table",
						description: "creates a new table",
						content:
							'<div class="mceTmpl"><table width="98%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
					},
					{
						title: "Starting my story",
						description: "A cure for writers block",
						content: "Once upon a time...",
					},
					{
						title: "New list with dates",
						description: "New List with dates",
						content:
							'<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
					},
				],
				template_cdate_format:
					"[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
				template_mdate_format:
					"[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
				height: 600,
				image_caption: true,
				quickbars_selection_toolbar:
					"bold italic | quicklink h2 h3 blockquote quickimage quicktable",
				noneditable_noneditable_class: "mceNonEditable",
				toolbar_mode: "sliding",
				spellchecker_whitelist: ["Ephox", "Moxiecode"],
				content_style: ".mymention{ color: gray; }",
				contextmenu: "link image imagetools table",
				a11y_advanced_options: true,
				font_formats:
					"微软雅黑=Microsoft YaHei; 宋体=SimSun; 新宋体=NSimSun; 仿宋=FangSong; 楷体=KaiTi; 黑体=SimHei; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;",
				fontsize_formats:
					"12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 60px 72px",
				file_picker_types: "media,image,file", // 想要哪一个图标提供本地文件选择功能，参数可为media(媒体)、image(图片)、file(文件)
				setup: function (editor) {
					console.log(`ID为:${editor.id}的编辑器即将初始化.`);
				},
				init_instance_callback: function (editor) {
					console.log(`ID为:${editor.id}的编辑器已初始化完成.`);
				},
				file_picker_callback: function (cb, value, meta) {
					const token =
						getToken() || localStorage.getItem("access_token"); //登录标示
					const csrf_token = csrfToken();
					//文件分类
					const filetype = {
						image: ".png, .jpg, .jpeg, .gif",
						media: ".mp3, .mp4",
						link:
							".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4",
					};
					//当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
					//创建一个隐藏的type=file的文件选择input
					let input = document.createElement("input");
					input.setAttribute("type", "file");
					input.setAttribute("accept", filetype[meta.filetype]);
					input.click();
					input.onchange = function () {
						let file = this.files[0]; //只选取第一个文件。如果要选取全部，后面注意做修改
						let xhr, formData;
						xhr = new XMLHttpRequest();
						xhr.open(
							"POST",
							process.env.VUE_APP_SERVER_API + "/api/upload"
						);
						xhr.withCredentials = true;
						xhr.setRequestHeader(
							"authorization",
							"Bearer " + token
						);
						xhr.setRequestHeader("x-csrf-token", csrf_token);
						// eslint-disable-next-line no-unused-vars
						xhr.upload.onprogress = function (e) {
							// 进度(e.loaded / e.total * 100)
						};
						xhr.onerror = function () {
							//根据自己的需要添加代码
							console.log(xhr.status);
							return;
						};
						xhr.onload = function () {
							let json;
							if (xhr.status != 200) {
								console.log("HTTP 错误: " + xhr.status);
								return;
							}
							json = JSON.parse(xhr.responseText);
							//假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
							if (!json || json.code != 200) {
								console.log(json.msg);
								return;
							} else {
								//接口返回的文件保存地址
								let mediaLocation =
									process.env.VUE_APP_SERVER_API +
									json.data.url;
								//cb()回调函数，将mediaLocation显示在弹框输入框中
								cb(mediaLocation, {
									title: file.name,
									text: file.name,
								});
							}
						};
						formData = new FormData();
						//假设接口接收参数为file,值为选中的文件
						formData.append("file", file);
						//正式使用将下面被注释的内容恢复
						xhr.send(formData);
					};
				},
			},
		};
	},
	watch: {
		value() {
			this.html = this.value;
		},
		html(newValues) {
			this.$emit("input", newValues);
			this.$emit("change", newValues);
		},
	},
	created() {
		this.setInt();
	},
	methods: {
		setInt() {
			this.html = this.value;
			const options = this.options;
			for (let option in options) {
				this.init[option] = options[option];
			}
		},
	},
};
</script>
