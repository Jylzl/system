<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-15 11:39:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-25 11:23:35
 -->
<template>
	<div>
		<el-autocomplete
			v-if="o_data.type == 'email'"
			v-model="o_data.value"
			:name="o_data.prop"
			:type="o_data.type"
			:placeholder="o_data.placeholder || defPlaceholder"
			:disabled="o_data.disabled"
			:clearable="o_data.clearable"
			:minlength="o_data.minlength"
			:maxlength="o_data.maxlength"
			:show-word-limit="o_data.showWordLimit"
			:readonly="o_data.readonly"
			:fetch-suggestions="querySearch"
			:trigger-on-focus="false"
			class="w100"
		></el-autocomplete>
		<el-input
			v-else
			v-model="o_data.value"
			:name="o_data.prop"
			:type="o_data.type"
			:placeholder="o_data.placeholder || defPlaceholder"
			:disabled="o_data.disabled"
			:clearable="o_data.clearable"
			:minlength="o_data.minlength"
			:maxlength="o_data.maxlength"
			:show-word-limit="o_data.showWordLimit"
			:show-password="o_data.type == 'password'"
			:autosize="o_data.autosize || {
						minRows: o_data.minRows > 0 ? o_data.minRows : 3,
						maxRows: o_data.maxRows > 0 ? o_data.maxRows : 3
					}"
			:resize="o_data.resize?'vertical':'none'"
			class="w100"
		></el-input>
	</div>
</template>

<script>
export default {
	name: "d-input",
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		},
		//默认配置
		restaurants: {
			type: Array,
			default() {
				return [
					{
						value: "@qq.com"
					},
					{
						value: "@163.com"
					},
					{
						value: "@163.net"
					},
					{
						value: "@126.com"
					},
					{
						value: "@sina.com"
					},
					{
						value: "@yahoo.com.cn"
					},
					{
						value: "@gmail.com"
					},
					{
						value: "@outlook.com"
					}
				];
			}
		}
	},
	watch: {
		data: {
			handler(value) {
				this.o_data = value;
			},
			immediate: true,
			deep: true
		}
	},
	data() {
		return {
			o_data: this.data
		};
	},
	computed: {
		defPlaceholder() {
			let txt = "";
			switch (this.data.type) {
				case "email":
					txt = "邮箱号码";
					break;
				case "password":
					txt = "密码";
					break;
				case "textarea":
					txt = "多行文本";
					break;
				default:
					txt = "文本内容";
					break;
			}
			return `请输入${txt}`;
		}
	},
	filters: {},
	methods: {
		//邮箱自动补全功能
		querySearch(queryString, cb) {
			//邮箱自动补全搜索方法
			function createFilter(queryString) {
				return restaurant => {
					return (
						restaurant.value
							.toLowerCase()
							.indexOf(queryString.toLowerCase()) === 0
					);
				};
			}
			let index = queryString.lastIndexOf("@");
			var restaurants = this.restaurants;
			if (index > -1) {
				restaurants = restaurants.filter(restaurant => {
					return (
						restaurant.value.substr(
							0,
							queryString.length - index
						) == queryString.substr(index, queryString.length)
					);
				});
				restaurants = restaurants.map(restaurant => {
					let obj = {};
					obj.value = restaurant.value.substring(
						queryString.length - index
					);
					return obj;
				});
			}
			restaurants = restaurants.map(restaurant => {
				let obj = {};
				obj.value = queryString + restaurant.value;
				return obj;
			});
			var results = queryString
				? restaurants.filter(createFilter(queryString))
				: restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		}
	}
};
</script>

<style scoped>
.w100 {
	width: 100%;
}
</style>