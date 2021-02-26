<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-16 17:22:58
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-21 08:41:38
 -->
<template>
	<draggable
		element="div"
		handle=".drag-btn"
		group="people"
		ghost-class="ghost"
		:sort="true"
		@change="change"
		@start="start"
		@end="end"
		@move="move"
		:list="myArray"
		class="widget-form-list"
	>
		<transition-group
			appear
			tag="div"
			id="widgetFormBox"
			class="h100 mh1080 clearfix"
			:style="{ 'min-height': n_formboxwrapHight }"
		>
			<el-col v-for="(item, index) in myArray" :span="item.span" :key="item.id" :data-id="item.id">
				<el-form-item
					class="widget-form-item"
					:class="{ active: index == o_activeInf.index }"
					:label="item.label"
					:required="item.check"
					:rules="item.rules"
					v-on:click.native="itemClick(index)"
				>
					<keep-alive>
						<div style="padding: 0 10px;">
							<component :is="item.component" :data="item"></component>
						</div>
					</keep-alive>
					<div class="widget-view-drag drag-btn" v-if="index == o_activeInf.index">
						<i class="el-icon-rank" title="拖拽"></i>
					</div>
					<div class="widget-view-action" v-if="index == o_activeInf.index">
						<i class="el-icon-top" title="上移" @click.capture.stop="moveUp(index)"></i>
						<i class="el-icon-bottom" title="下移" @click.capture.stop="moveDown(index)"></i>
						<i class="el-icon-document-copy" title="复制" @click.capture.stop="copy(index)"></i>
						<i class="el-icon-edit" title="编辑" @click.capture.stop="edit(index)"></i>
						<i class="el-icon-delete" title="删除" @click.capture.stop="remove(index)"></i>
					</div>
				</el-form-item>
			</el-col>
		</transition-group>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="1060px">
			<div v-if="dialogVisible">
				<el-form class="demo-form-inline">
					<el-form-item :label="myArray[o_activeInf.index].label">
						<component :is="myArray[o_activeInf.index].component" :data="myArray[o_activeInf.index]"></component>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</draggable>
</template>

<script>
import va from "@/components/dsurvey/rules.js";
import draggable from "vuedraggable";
import { deepClone } from "@/components/dsurvey/util.js";

import dTitle from "@/components/dsurvey/field/dTitle.vue";
import dCascader from "@/components/dsurvey/field/dCascader.vue";
import dCheckbox from "@/components/dsurvey/field/dCheckbox.vue";
import dInput from "@/components/dsurvey/field/dInput.vue";
import dNumber from "@/components/dsurvey/field/dNumber.vue";
import dRadio from "@/components/dsurvey/field/dRadio.vue";
import dRate from "@/components/dsurvey/field/dRate.vue";
import dRichText from "@/components/dsurvey/field/dRichText.vue";
import dSelect from "@/components/dsurvey/field/dSelect.vue";
import dUpload from "@/components/dsurvey/field/dUpload.vue";
export default {
	name: "widget-form",
	components: {
		draggable, // 拖拽
		"d-title": dTitle,
		"d-cascader": dCascader,
		"d-checkbox": dCheckbox,
		"d-input": dInput,
		"d-number": dNumber,
		"d-radio": dRadio,
		"d-rate": dRate,
		"d-richText": dRichText,
		"d-select": dSelect,
		"d-upload": dUpload,
	},
	props: {
		formboxwrapHight: {
			type: String,
			default: "",
		},
		components: {
			type: Array,
			default() {
				return [];
			},
		},
		myArray: {
			type: Array,
			default() {
				return [];
			},
		},
		activeInf: {
			type: Object,
			default() {
				return {
					prop: null,
					index: null,
				};
			},
		},
	},
	data() {
		return {
			va: va,
			n_formboxwrapHight: this.formboxwrapHight + "px",
			o_activeInf: this.activeInf,
			dialogVisible: false,
		};
	},
	watch: {
		formboxwrapHight(val) {
			this.n_formboxwrapHight = val + "px";
		},
		activeInf: {
			handler(val) {
				this.o_activeInf = val;
			},
			immediate: true,
		},
	},
	filters: {
		rulesFilter: function (value) {
			console.log(value);
			if (value.check) {
				if (value.checkType == undefined) {
					return [];
				} else {
					let arr = [];
					switch (value.checkType) {
						case "0":
							arr = [
								{
									required: false,
									message: `请输入${value.label}`,
									trigger: ["blur", "change"],
								},
							];
							break;
						default:
							console.log(va);
							console.log(value.checkType);
							console.log(va[value.checkType]);
							arr = [va[value.checkType]()];
							break;
					}
					return arr;
				}
			} else {
				return [];
			}
		},
	},
	computed: {},
	mounted() {},
	methods: {
		//start,end,add,update,sort,remove 得到的都差不多
		change(evt) {
			let index = null;
			if (evt.added != undefined && evt.added.newIndex != undefined) {
				index = evt.added.newIndex;
			}
			if (evt.moved != undefined && evt.moved.newIndex != undefined) {
				index = evt.moved.newIndex;
			}
			this.o_activeInf.index = index != null ? index : null;
		},
		start(evt) {
			console.log(evt);
		},
		end(evt) {
			console.log(evt);
		},
		// eslint-disable-next-line no-unused-vars
		move(evt, originalEvent) {
			console.log(evt);
		},
		// 元素点击选中
		itemClick(index) {
			console.log(index);
			// this.o_activeInf.prop = this.myArray[index].prop;
			this.o_activeInf.index = index;
		},
		// 复制
		copy(index) {
			let obj = deepClone(this.myArray[index]);
			obj.prop = "attr_" + Math.random().toString().slice(-10);
			obj.id = Math.random().toString().slice(-10);
			this.myArray.splice(index + 1, 0, obj);
			// this.o_activeInf.prop = this.myArray[index + 1].prop;
			this.o_activeInf.index = index + 1;
		},
		// 移除
		remove(index) {
			this.myArray.splice(index, 1);
			// this.o_activeInf.prop =
			//   this.myArray.length > 0
			//     ? this.myArray[index == 0 ? 0 : index - 1].prop
			//     : null;
			this.o_activeInf.index =
				this.myArray.length > 0 ? (index == 0 ? 0 : index - 1) : null;
		},
		// 上移
		moveUp(index) {
			if (index != 0) {
				this.myArray[index] = this.myArray.splice(
					index - 1,
					1,
					this.myArray[index]
				)[0];
				this.o_activeInf.index = index - 1;
				// this.o_activeInf.prop = this.myArray[index - 1].prop;
			} else {
				this.myArray.push(this.myArray.shift());
				this.o_activeInf.index = this.myArray.length - 1;
				// this.o_activeInf.prop = this.myArray[this.myArray.length - 1].prop;
			}
		},
		// 下移
		moveDown(index) {
			if (index != this.myArray.length - 1) {
				this.myArray[index] = this.myArray.splice(
					index + 1,
					1,
					this.myArray[index]
				)[0];
				this.o_activeInf.index = index + 1;
				// this.o_activeInf.prop = this.myArray[index + 1].prop;
			} else {
				this.myArray.unshift(this.myArray.splice(index, 1)[0]);
				this.o_activeInf.index = 0;
				// this.o_activeInf.prop = this.myArray[0].prop;
			}
		},
		// 编辑
		edit(index) {
			console.log(index);
			console.log(this.o_activeInf);
			this.dialogVisible = true;
		},
	},
};
</script>
