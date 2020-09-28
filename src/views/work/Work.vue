<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 15:42:30
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-28 15:02:26
 -->
<template>
	<el-container>
		<el-main>
			<div class="work h100">
				<el-row :gutter="20">
					<el-col
						:span="4"
						:xl="4"
						:lg="4"
						:md="8"
						:sm="12"
						:xs="24"
						v-for="(i,index) in inf"
						:key="i.unm + index"
						class="m-b-20"
					>
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
					<el-col
						:span="8"
						:xl="8"
						:lg="8"
						:md="8"
						:sm="12"
						:xs="24"
						class="m-b-20"
						v-for="i in 2"
						:key="i"
					>
						<el-card class="custom-card" :body-style="{ padding: '15px' }">
							<div slot="header">
								<span>快捷操作</span>
							</div>
							<div class="personal-inf text item">
								<el-row :gutter="10">
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-edit"></i>
											</div>
											<div class="card-inf">数据发布</div>
										</el-link>
									</el-col>
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-cpu"></i>
											</div>
											<div class="card-inf">数据清洗</div>
										</el-link>
									</el-col>
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-search"></i>
											</div>
											<div class="card-inf">数据检索</div>
										</el-link>
									</el-col>
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-pie-chart"></i>
											</div>
											<div class="card-inf">数据统计</div>
										</el-link>
									</el-col>
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-setting"></i>
											</div>
											<div class="card-inf">个人设置</div>
										</el-link>
									</el-col>
									<el-col :span="6" :xl="6" :lg="8" :md="8" :sm="12" :xs="8">
										<el-link :underline="false" class="personal-inf-card">
											<div class="card-icon">
												<i class="el-icon-circle-plus-outline"></i>
											</div>
											<div class="card-inf">添加入口</div>
										</el-link>
									</el-col>
								</el-row>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8" :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="m-b-20">
						<el-card class="custom-card" :body-style="{ padding: '15px' }">
							<div slot="header">
								<span>今日数据</span>
							</div>
							<div class="text item personal-content">
								<el-row :gutter="10">
									<el-col :span="12" v-for="(item,index) in personalContent" :key="index">
										<el-link :underline="false" class="personal-content-card">
											<div class="card-title">{{item.title}}</div>
											<div class="card-content">{{item.count}}</div>
										</el-link>
									</el-col>
								</el-row>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="16" :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="m-b-20">
						<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">
								<span>访问量</span>
								<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
							</div>
							<div class="canvas-box">
								<div id="canvas"></div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8" :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="m-b-20">
						<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">
								<span>民生关注</span>
								<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
							</div>
							<div class="canvas-box">
								<div id="canvas1"></div>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</el-main>
		<el-footer height="42px">
			<div class="work-footer">
				<div class="work-footer-right">
					<el-link :underline="false" tyoe="info">华为开发者联盟 版权所有 ©2019-2020</el-link>
				</div>
				<div class="work-footer-right">
					<el-link :underline="false" type="info" href="https://element.eleme.io" target="_blank">问题反馈</el-link>
					<span>|</span>
					<el-link :underline="false" type="info">使用条款</el-link>
					<span>|</span>
					<el-link :underline="false" type="info">隐私声明</el-link>
					<span>|</span>
					<el-link :underline="false" type="info">隐私政策</el-link>
				</div>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
import countTo from "vue-count-to";
import { Line, Radar } from "@antv/g2plot";

export default {
	components: { countTo },
	data() {
		return {
			inf: [
				{
					title: "内容发布量",
					unm: 26889,
				},
				{
					title: "公报发布量",
					unm: 26189,
				},
				{
					title: "公众号文章",
					unm: 26889,
				},
				{
					title: "OA邮件",
					unm: 26889,
				},
				{
					title: "分类统计五",
					unm: 26889,
				},
				{
					title: "分类统计六",
					unm: 26889,
				},
			],
			personalContent: [
				{
					title: "资源录入量",
					count: 60,
				},
				{
					title: "资源导入量",
					count: 60,
				},
				{
					title: "资源采集量",
					count: 60,
				},
				{
					title: "资源同步量",
					count: 100,
				},
			],
			data: [
				{ year: "00:00", value: 3 },
				{ year: "01:00", value: 4 },
				{ year: "02:00", value: 5 },
				{ year: "03:00", value: 5 },
				{ year: "04:00", value: 4 },
				{ year: "05:00", value: 6 },
				{ year: "06:00", value: 7 },
				{ year: "07:00", value: 9 },
				{ year: "08:00", value: 9 },
				{ year: "09:00", value: 5 },
				{ year: "10:00", value: 6 },
				{ year: "11:00", value: 4 },
				{ year: "12:00", value: 7 },
				{ year: "13:00", value: 9 },
				{ year: "14:00", value: 5 },
				{ year: "15:00", value: null },
				{ year: "16:00", value: null },
				{ year: "17:00", value: null },
				{ year: "18:00", value: 4 },
				{ year: "19:00", value: 7 },
				{ year: "20:00", value: 4 },
				{ year: "21:00", value: 9 },
				{ year: "22:00", value: 4 },
				{ year: "23:00", value: 6 },
			],
			data1: [
				{
					item: "招工用工",
					score: 70,
				},
				{
					item: "税费减免",
					score: 60,
				},
				{
					item: "融资贷款",
					score: 60,
				},
				{
					item: "农林牧渔",
					score: 40,
				},
				{
					item: "交通出行",
					score: 60,
				},
				{
					item: "社会保障",
					score: 70,
				},
				{
					item: "返岗复工",
					score: 50,
				},
				{
					item: "疫情防控",
					score: 30,
				},
				{
					item: "高考志愿",
					score: 60,
				},
				{
					item: "中考查询",
					score: 50,
				},
			],
		};
	},
	mounted() {
		this.chart();
		this.chart1();
	},
	methods: {
		chart() {
			const data = this.data;
			const linePlot = new Line("canvas", {
				title: {
					visible: false,
					text: "访问量",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				data,
				xField: "year",
				yField: "value",
				lineStyle: {
					stroke: "#1476d1",
					lineWidth: 2,
					lineDash: [4, 5],
					strokeOpacity: 0.7,
					shadowColor: "#1476d1",
					shadowBlur: 10,
					shadowOffsetX: 5,
					shadowOffsetY: 5,
					cursor: "pointer",
				},
			});
			linePlot.render();
		},
		chart1() {
			const data = this.data1;
			const radarPlot = new Radar(document.getElementById("canvas1"), {
				title: {
					visible: false,
					text: "民生关注",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				data,
				angleField: "item",
				radiusField: "score",
				color: ["#1476d1"],
				radiusAxis: {
					gridType: "arc",
					gridAlternateColor: "rgba(0, 0, 0, 0.04)",
				},
			});
			radarPlot.render();
		},
	},
};
</script>

<style scoped>
.work {
	overflow: hidden;
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
	border-radius: 1px;
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

.canvas-box {
	background-color: #fff;
}

/* 个人控制台 */
.personal-inf-card {
	display: block;
	height: 84px;
}

.personal-inf-card .card-icon {
	height: 60px;
	line-height: 60px;
	text-align: center;
	font-size: 28px;
	background-color: #f8f8f8;
	border-radius: 2px;
}

.personal-inf-card .card-inf {
	height: 24px;
	line-height: 24px;
	font-size: 14px;
	text-align: center;
}

.personal-content-card {
	box-sizing: border-box;
	display: block;
	height: 84px;
	padding: 10px;
	background-color: #f8f8f8;
}

.personal-content-card .card-title {
	height: 24px;
	line-height: 24px;
}

.personal-content-card .card-content {
	height: 40px;
	line-height: 40px;
	font-size: 30px;
	font-weight: bold;
	color: #009688;
	text-align: left;
}

.personal-inf .el-row,
.personal-content .el-row {
	margin-top: -10px;
}

.personal-inf .el-col,
.personal-content .el-col {
	margin-top: 10px;
}

.work-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 42px;
	line-height: 42px;
	font-size: 12px;
	color: #999;
}

.work-footer-right span {
	padding: 0 6px;
}
</style>