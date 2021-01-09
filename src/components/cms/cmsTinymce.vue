<!--
 * @description: Tinymce编辑器组件
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-30 17:49:09
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-09 15:48:59
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
					bdmap: "/tinymce/plugins/bdmap/plugin.js",
					importword: "/tinymce/plugins/importword/plugin.js",
					layout: "/tinymce/plugins/layout/plugin.js",
					letterspacing: "/tinymce/plugins/letterspacing/plugin.js",
					table: "/tinymce/plugins/table/plugin.js",
					upfile: "/tinymce/plugins/upfile/plugin.js",
				},
				plugins:
					"print preview powerpaste importword upfile layout importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount a11ychecker imagetools textpattern noneditable help formatpainter charmap quickbars emoticons advtable",
				mobile: {
					plugins:
						"print preview powerpaste importword upfile layout importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount a11ychecker textpattern noneditable help formatpainter charmap quickbars emoticons advtable",
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
					"undo redo | formatselect | formatpainter a11ycheck | fontselect | fontsizeselect | bold italic underline strikethrough subscript superscript removeformat | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent indent2em lineheight | lists image media emoticons link charmap codesample table | bdmap importword upfile layout | fullscreen",
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
					{
						title: "12306通知",
						description: "New List with dates",
						content:
							'<div class="box" style="box-sizing:border-box;width:760px;margin:0 auto;border:1px solid #f1f1f1;background:url(http://mobile.12306.cn/weixin/resources/weixin/images/mail/mail_train.jpg) no-repeat bottom right"><div class="box-header" style="height:275px"><img src="http://mobile.12306.cn/weixin/resources/weixin/images/mail/mail_top.jpg" style="display:block;width:760px;height:275px" alt=""></div><div class="box-body" style="box-sizing:border-box;padding:0 20px"><div class="content-box" style="box-sizing:border-box"><p style="font-size:16px;font-weight:700">尊敬的 <span style="color:#ff764c">李先生：</span></p><p style="line-height:20px;font-size:12px">您好！</p><p style="line-height:20px;font-size:12px">您于2021年01月03日在中国铁路客户服务中心网站(<a href="http://www.12306.cn" target="_blank" rel="noopener">12306.cn</a>) 成功购买了1张车票，票款共计57.50元，订单号码 <span style="color:#ff764c;font-size:14px">EC96802079</span> 。 所购车票信息如下：</p><div style="border-top:1px dashed #e9ecf0;border-bottom:1px dashed #e9ecf0;color:#000;font-size:14px;padding-top:10px;padding-bottom:10px"><div style="line-height:20px;color:#000;padding-top:5px;padding-bottom:5px;font-weight:700">1.李子隆，<span style="border-bottom:1px dashed #ccc" t="5" times="18:47开">2021年01月03日</span>18:47开，孝感北站-武汉站，G851次列车,3车9F号，二等座，票价57.5元。</div><div style="line-height:20px;color:#000;padding-top:5px;padding-bottom:5px;font-weight:700">为了确保旅客人身安全和列车运行秩序，车站将在开车时间之前提前停止售票、检票，请合理安排出行时间，提前到乘车站办理换票、安检、验证并到指定场所候车，以免耽误乘车。</div></div><div style="font-size:16px;color:#ff764c;padding-top:15px;padding-bottom:15px"><img src="http://mobile.12306.cn/weixin/resources/weixin/images/mail/mail_tips.jpg" width="18" height="18" style="vertical-align:-2px;margin-right:10px">温馨提示</div><div style="font-size:12px"><div style="line-height:20px;margin-bottom:10px;font-size:12px">（1）请牢记 <a href="http://www.12306.cn" target="_blank" rel="noopener">12306.cn</a> 网站提供的订单号码 <span style="color:#7095bd;font-weight:700">EC96802079</span>，并妥善保管，以确保您的购票信息安全。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（2）选择车票快递服务的，请准备有效身份证件原件。您可在“已完成订单”-&gt; “订单详情”-&gt; “快递详情”中查看你的快递状态。当车票处于“待制票”状态时，用户可进行以下变更操作：<br><span style="margin-right:10px">1&gt;取消车票快递服务：您可单独选择取消车票快递服务，系统自动退还快递服务费。车票快递服务一经取消，同一订单无法再次提供车票快递服务。</span><br><span style="margin-right:10px">2&gt;改签、变更到站、退票及换取纸质车票：您可自行办理车票的改签、变更到站、退票、换取纸质车票等业务。变更后符合快递服务条件的车票将按照原约定继续提供快递服务；变更后整件不符合快递服务条件的车票将取消快递服务，同时系统自动退还快递服务费。</span><br><span style="margin-right:10px">当车票处于“已制票”、 “派件中”状态时，您不能在网站办理取消车票快递服务及办理车票的改签、变更到站、退票、换票等业务，如有特殊情况可联系快递（物流）企业客户代表。</span></div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（3）根据国家车票实名制管理有关规定，换票及进站乘车时，请携带购票时所使用的乘车人有效身份证件原件；否则，不能换票，车站拒绝进站乘车，列车按无票处理。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（4）<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站对注册用户和常用联系人（乘车人）进行身份信息核验。如您的身份信息核验状态为“待核验”时，请携带购票时所使用的有效身份证件原件到车站售票窗口或者铁路客票代售点办理身份信息核验；为“未通过”（限居民身份证）、“请报验”时，请携带购票时所使用的有效身份证件原件到车站售票窗口办理。如果您拟委托他人办理时，请同时携带代办人和您的有效身份证件原件。办理时，如果您的居民身份证不能通过自动识读设备自动读取的，不能办理，请到发证机关换证后再办理。核验通过的，可以在车站售票窗口对已购车票办理换票、改签、变更到站、退票。您也可以在<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站对已购车票正常办理退票。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（5）使用乘车人本人的居民身份证在<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站购票，且乘车站和下车站均具备居民身份证自动识读检票条件的，可以通过自动检票机（闸机）自动识读居民身份证的方式办理进、出站检票手续，无需提前换取纸质车票；因此乘车至到站后，需报销凭证时，请不晚于自乘车日期之日起31日，凭购票时所使用的居民身份证原件到车站售票窗口索取，逾期不予办理。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（6）其他情形请换取纸质车票后进站乘车。自<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站购票交易成功之时起，您即可到铁路客票代售点、办理客运售票业务的车站售票窗口或自动售（取）机换取纸质车票。如您拟于乘车前到乘车站换票，请合理安排出行时间，以避免因车站提前停止售票、排队人数多、来不及换票而耽误乘车。在车站售票窗口，请提供居民身份证原件；如果使用港澳居民来往内地通行证、台湾居民来往大陆通行证、按规定可使用的护照购票或者所使用的居民身份证不能识读的，请提供该有效身份证件原件和订单号码EC96802079。在自动售（取）票机，请使用购票时所使用的乘车人居民身份证原件。学生票、残疾军人（含伤残人民警察）票，请提供购票时所使用的有效身份证件和附有学生火车票优惠卡的学生证、“中华人民共和国残疾军人证”、“中华人民共和国伤残人民警察证”（均为原件），符合规定条件的，可以换票、进站、乘车。换票时，按规定核收异地售票手续费或铁路客票销售服务费。换票后，请妥善保管纸质车票，保持票面信息清晰、可识读，以便您顺利乘车。请注意妥善保护票面身份信息。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（7）如果换票后丢失车票时，请不晚于票面乘车站停止检票时间前20分钟到车站售票窗口办理挂失补办。办理时，请提供购票时所使用的乘车人有效身份证件原件、原车票乘车日期和购票地车站名称等，经车站确认无误后，请按原车票车次、席位、票价重新购买一张新车票。持新车票乘车时，请向列车工作人员声明；到站前列车长经确认该席位使用正常的，将开具客运记录；请在到站后24小时内，凭客运记录、新车票和购票时所使用的有效身份证件原件，至到站退票窗口办理新车票退票。办理时，车站按规定核收补票的手续费。如果超过规定时间或者原车票已经退票、挂失补办的，不能办理挂失补办。新车票不能改签或变更到站，新车票不能改签或变更到站，但可以退票；退票时按规定核收补票的手续费。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（8）如果取消旅行，没有换取纸质车票且不晚于开车前的，可以登录<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站，也可以到办理客运售票业务的车站售票窗口办理退票；已经换取纸质车票的非电子票，请携带购票时所使用的乘车人有效身份证件原件（以及纸质车票），于票面载明的开车时间前到车站售票窗口办理；如果使用港澳居民来往内地通行证、台湾居民来往大陆通行证、按规定可使用的护照购票或者所使用的居民身份证不能识读的，请携带该有效身份证件原件和订单号码EC96802079。如果请他人代办退票时，还请携带代办人的有效身份证件原件。退票时，按购票时所使用在线支付工具的有关规定，应退票款在规定时间内退回至购票时所使用的在线支付工具。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（9）在车站办理换票、改签、变更到站、退票、挂失补办、身份信息核验、索取报销凭证、验证、候车、检票时，请注意车站公告以及售票窗口、验证口、候车室（区）、检票口等标识。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（10）跨境车票退票规则：<br><span style="margin-right:10px">1&gt;到站为香港西九龙站的车票，办理退票应不晚于票面指定的日期、车次开车前30分钟；发站为香港西九龙站的车票应不晚于60分钟。</span><br><span style="margin-right:10px">2&gt;退票费核收标准：在票面开车时间前48小时内办理退票的，按票面票价的50%计算；在票面开车时间前48小时至第14天的，按票面票价的30%计算；在票面开车时间前15天及以上的，按票面票价的5%计算。退票费按元计算，不足一元的部分舍去免收。</span></div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（11）跨境车票改签规则：<br><span style="margin-right:10px">1&gt;到站为香港西九龙站的车票，办理改签应不晚于票面指定的日期、车次开车前25分钟；发站为香港西九龙站的车票应不晚于60分钟。</span><br><span style="margin-right:10px">2&gt;改签后的车票不得退票。</span></div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（12）跨境车票乘车规则：<br><span style="margin-right:10px">1&gt;旅客必须持有效车票并按票面载明的日期、车次、席别乘车，同时需携带有效的出入境证件及签注。</span><br><span style="margin-right:10px">更多跨境车票注意事项详见铁路跨境旅客相关运输组织规则和车站公告。</span></div><div style="line-height:20px;margin-bottom:10px;font-size:12px">（13）未尽事项，请关注<a href="http://www.12306.cn" rel="noopener" target="_blank">12306.cn</a>网站或车站公告。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">感谢您使用中国铁路客户服务中心网站<span style="color:#ff764c">12306.cn</span>！ 本邮件由系统自动发出，请勿回复。</div><div style="line-height:20px;margin-bottom:10px;font-size:12px">祝您的朋友（们）旅途愉快！</div></div><p style="text-align:right;height:24px;font-size:12px"><img src="http://mobile.12306.cn/weixin/resources/weixin/images/mail/mail_logo.jpg" width="20" height="20" style="vertical-align:bottom;margin-right:10px">中国铁路客户服务中心</p><p style="text-align:right;height:24px;font-size:12px">2021年01月03日</p></div></div><div class="box-footer" style="padding:10px 0 15px 0"><img src="http://mobile.12306.cn/weixin/resources/weixin/images/mail/mail_line.jpg" style="display:block;width:720px;height:7px;margin:0 auto" alt=""></div></div>',
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
				images_upload_url:
					process.env.VUE_APP_SERVER_API + "/api/upload",
				images_upload_base_path: process.env.VUE_APP_SERVER_API,
				images_upload_credentials: true,
				images_upload_handler: function (blobInfo, succFun, failFun) {
					const token =
						getToken() || localStorage.getItem("access_token"); //登录标示
					const csrf_token = csrfToken();
					var xhr, formData;
					var file = blobInfo.blob(); //转化为易于理解的file对象
					xhr = new XMLHttpRequest();
					xhr.open(
						"POST",
						process.env.VUE_APP_SERVER_API + "/api/upload"
					);
					xhr.withCredentials = true;
					xhr.setRequestHeader("authorization", "Bearer " + token);
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
						var json;
						if (xhr.status != 200) {
							console.log("HTTP 错误: " + xhr.status);
							return;
						}
						json = JSON.parse(xhr.responseText);
						//假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
						if (!json || json.code != 200) {
							console.log(json.msg);
							failFun("Invalid JSON: " + xhr.responseText);
							return;
						} else {
							succFun(
								process.env.VUE_APP_SERVER_API + json.data.url
							);
						}
					};
					formData = new FormData();
					formData.append("file", file, file.name); //此处与源文档不一样
					formData.append("folder", "tinymce");
					xhr.send(formData);
				},
				file_picker_callback: function (cb, value, meta) {
					console.log("file_picker_callback");
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
						formData.append("folder", "tinymce");
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
