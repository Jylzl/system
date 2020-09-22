<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-09-22 10:31:11
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-22 15:51:46
-->
<template>
	<div>
		<!-- 标签上的右键菜单 -->
		<ContextMenu
			ref="contextMenu"
			:itemList="menuItemList"
			@mouseleave="onMouseLeave"
			:visible.sync="menuVisible"
			@select="onMenuSelect"
		/>
		<el-button type="primary" @contextmenu.native="onContextMenu">主要按钮</el-button>
	</div>
</template>
<script>
import ContextMenu from "@/components/module/ContextMenu";
export default {
	name: "AppEight",
	components: {
		ContextMenu,
	},
	data() {
		return {
			menuVisible: false,
			menuItemList: [
				{ key: "1", text: "刷新" },
				{ key: "2", text: "关闭" },
				{ key: "3", text: "关闭其他" },
				{ key: "4", text: "关闭所有" },
			],
		};
	},
	methods: {
		onMouseLeave() {},
		onContextMenu(e) {
			e.preventDefault();
			if (e) {
				this.menuVisible = true;
				this.$refs.contextMenu.setPosition(e);
			}
		},
		onMenuSelect(key) {
			const item = this.menuItemList.filter((item) => {
				return item.key == key;
			});
			this.$message(`您点击了${item[0].text}`);
			// 当前点击的tab是智能表单-详情
		},
	},
};
</script>