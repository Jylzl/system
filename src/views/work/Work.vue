<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 15:42:30
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-08 18:40:00
 -->
<template>
	<div class="work h100">
		<el-row :gutter="20">
			<el-col :span="4" v-for="(i,index) in inf" :key="i.unm + index" class="m-b-20">
				<div :class="'grid-content item bg-purple-'+index">
					<a href="javascript:void(0);">
						<div class="item-header">
							<p>{{i.title}}</p>
							<span>实时</span>
						</div>
						<div class="item-body">
							<span class="h2">
								<countTo :startVal="0" :endVal="i.unm" :duration="3000"></countTo>
							</span>
						</div>
						<p class="item-tip">类</p>
					</a>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8" v-for="i in 3" :key="i" class="m-b-20">1</el-col>
		</el-row>
	</div>
</template>

<script>
import countTo from "vue-count-to";
export default {
	components: { countTo },
	data() {
		return {
			inf: [
				{
					title: "内容发布量",
					unm: 26889
				},
				{
					title: "公报发布量",
					unm: 26189
				},
				{
					title: "公众号文章",
					unm: 26889
				},
				{
					title: "OA邮件",
					unm: 26889
				},
				{
					title: "分类统计五",
					unm: 26889
				},
				{
					title: "分类统计六",
					unm: 26889
				}
			]
		};
	}
};
</script>

<style scoped>
.work {
	background-color: #f7f7f9;
}

.grid-content {
	box-sizing: border-box;
	position: relative;
	height: 110px;
	padding: 12px;
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	border-radius: 4px;
}

.bg-purple-0 {
	background: linear-gradient(90deg, #2f80ed, #54c9f2);
}

.bg-purple-1 {
	background: linear-gradient(90deg, #03c9fb, #3bd3af);
}

.bg-purple-2 {
	background: linear-gradient(90deg, #3387ed, #56ccf2);
}

.bg-purple-3 {
	background: linear-gradient(90deg, #068095, #78ffd6);
}

.bg-purple-4 {
	background: linear-gradient(90deg, #30a0ed, #55cbf2);
}

.bg-purple-5 {
	background: linear-gradient(90deg, #3286ed, #56ccf2);
}

.grid-content > a {
	display: block;
	color: inherit;
	text-decoration: none;
}

.grid-content a .item-header {
	position: relative;
}

.item-header > p {
	height: 28px;
	line-height: 28px;
	color: #fff;
	margin: 0;
	font-size: 14px;
}

.item-header > span {
	box-sizing: border-box;
	position: absolute;
	right: 0;
	top: 0;
	height: 26px;
	padding: 2px 8px;
	line-height: 22px;
	border-radius: 4px;
	font-size: 12px;
	background: rgba(255, 255, 255, 0.3);
}

.item-body {
	margin-top: 8px;
	height: 40px;
	line-height: 40px;
}

.item-body .h2 {
	color: #fff;
	margin: 0;
	font-size: 22px;
	line-height: 42px;
	font-weight: 700;
}

.item-tip {
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	position: absolute;
	width: 48px;
	height: 48px;
	bottom: 10px;
	right: 10px;
	border: 2px solid #fff;
	border-radius: 100%;
	font-size: 26px;
	-webkit-transform: rotate(-40deg);
	transform: rotate(-40deg);
	opacity: 0.1;
}
</style>