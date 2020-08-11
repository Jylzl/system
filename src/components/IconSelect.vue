<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-28 09:23:17
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 19:54:02
--> 
<template>
	<div>
		<el-input
			placeholder="请输入内容"
			v-model="s_value"
			class="input-with-select"
			@change="change"
			clearable
		>
			<el-button
				slot="append"
				:icon="s_value?s_value:'el-icon-picture-outline-round'"
				@click="selectClick"
			></el-button>
		</el-input>
		<el-dialog title="选择图标" :visible.sync="dialogVisible" width="60%" :modal="false">
			<el-tabs v-model="activeName">
				<el-tab-pane :label="i.label" :name="'name'+index" v-for="(i,index) in iocns" :key="index">
					<div class="class-box">
						<el-scrollbar wrap-class="scrollbar-wrapper">
							<ul class="icon_lists">
								<li class="dib" v-for="item in i.list" :key="item.className">
									<i :class="item.className" @click="iconClick(item.className)" :title="item.title"></i>
									<div class="code-name" :title="item.className">{{item.className}}</div>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
import iconList from "@/plugins/iconfont/iconList";
export default {
	props: {
		value: {
			type: String,
			default: function () {
				return "";
			},
		},
	},
	data() {
		return {
			s_value: this.value,
			dialogVisible: false,
			activeName: "name0",
			iocns: iconList,
		};
	},
	watch: {
		value: {
			handler(value) {
				this.s_value = value;
			},
		},
	},
	methods: {
		selectClick() {
			this.dialogVisible = true;
		},
		iconClick(className) {
			this.dialogVisible = false;
			this.s_value = className;
			this.$emit("input", this.s_value);
		},
		change() {
			this.$emit("input", this.s_value);
		},
	},
};
</script>


<style lang="scss">
.icon-select .el-dialog__body {
	padding: 10px 20px;
}
</style>


<style scoped>
.class-box {
	height: 600px;
}

.icon_lists {
	width: 100% !important;
	overflow: hidden;
	*zoom: 1;
}

.icon_lists li {
	display: inline-block;
	width: 80px;
	margin-bottom: 10px;
	margin-right: 20px;
	text-align: center;
	list-style: none !important;
	cursor: default;
	vertical-align: top;
}

.icon_lists i {
	display: block;
	height: 60px;
	line-height: 60px;
	font-size: 32px;
	margin: 5px auto;
	color: #333;
	-webkit-transition: font-size 0.25s linear, width 0.25s linear;
	-moz-transition: font-size 0.25s linear, width 0.25s linear;
	transition: font-size 0.25s linear, width 0.25s linear;
	cursor: pointer;
}

.icon_lists i:hover {
	font-size: 52px;
}

.icon_lists li .name,
.icon_lists li .code-name {
	font-size: 14px;
	color: #666;
	height: 20px;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.icon_lists li .code-name {
	font-size: 13px;
}
</style>