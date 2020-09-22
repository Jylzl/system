<!--
 * @description: 右键菜单
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-22 10:30:05
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-22 15:51:54
-->
<template>
	<el-menu
		v-show="visible"
		:default-active="active"
		:style="style"
		class="contextmenu"
		@mouseleave="onMouseLeave"
		@select="onSelect"
	>
		<el-menu-item v-for="(item, index) in itemList" :key="index" :index="item.key">
			<div>{{item.text}}</div>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	name: "ContextMenu",
	props: {
		visible: {
			type: Boolean,
			required: false,
			default: false,
		},
		itemList: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
	data() {
		return {
			left: 0,
			top: 0,
			target: null,
			active: null,
		};
	},
	computed: {
		style() {
			return {
				left: this.left + "px",
				top: this.top + "px",
			};
		},
	},
	created() {
		// window.addEventListener('mousedown', e => this.closeMenu(e))
		// window.addEventListener('contextmenu', e => this.setPosition(e))
	},
	methods: {
		closeMenu(e) {
			if (
				["menuitemicon", "menuitem"].indexOf(
					e.target.getAttribute("role")
				) < 0
			) {
				this.$emit("update:visible", false);
			}
		},
		setPosition(e) {
			e.preventDefault();
			this.left = e.clientX;
			this.top = e.clientY;
			this.target = e.target.id.substr(4);
		},
		onSelect(key) {
			this.$emit("select", key, this.target);
			this.$emit("update:visible", false);
		},
		onMouseLeave() {
			this.$emit("update:visible", false);
		},
	},
	mounted() {
		document.addEventListener("click", () => {
			this.$emit("update:visible", false);
		});
	},
};
</script>

<style lang="scss" scoped>
.contextmenu {
	position: fixed;
	z-index: 5;
	width: 110px;
	border-radius: 4px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	text-align: left;
	.el-menu-item {
		padding: 0 10px;
		height: 36px;
		line-height: 36px;
		div {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
