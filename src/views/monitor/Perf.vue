<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 20:08:36
-->
<template>
	<div class="perf">
		<div>
			<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
				<div slot="header" class="clearfix w100">
					<span>
						服务状态
						<span style="font-size:12px; color:#999;">(2020-08-06 09:07)</span>
					</span>
					<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
				</div>
				<div class="canvas-box">
					<el-row :gutter="20">
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container1" class="canvas-chart"></div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container2" class="canvas-chart"></div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container3" class="canvas-chart"></div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container4" class="canvas-chart"></div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container5" class="canvas-chart"></div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<div id="container6" class="canvas-chart"></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</div>
		<div class="m-t-20">
			<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
				<div slot="header" class="clearfix w100">
					<span>访问量</span>
					<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
				</div>
				<div class="charts-box">
					<div id="container7"></div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { Line, Gauge } from "@antv/g2plot";
import { getSysInf } from "@/api/monitor/perf";

export default {
	data() {
		return {
			data7: [
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
		};
	},
	mounted() {
		this.getSysInf();
		this.chart1();
		this.chart2();
		this.chart3();
		this.chart4();
		this.chart5();
		this.chart6();
		this.chart7();
	},
	methods: {
		getSysInf() {
			getSysInf().then((res) => {
				console.log(res);
			});
		},
		chart1() {
			const gaugePlot = new Gauge(document.getElementById("container1"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "负载状态",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "负载状态",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 100,
				// range: [0, 25, 50, 75, 100],
				// color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				range: [0, 100],
				color: ["l(0) 0:#39B8FF 1:#e35767"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart2() {
			const gaugePlot = new Gauge(document.getElementById("container2"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "CPU使用率",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "CPU使用率",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 100,
				// range: [0, 25, 50, 75, 100],
				// color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				range: [0, 100],
				color: ["l(0) 0:#39B8FF 1:#e35767"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart3() {
			const gaugePlot = new Gauge(document.getElementById("container3"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "内存使用量",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 18,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "内存使用量",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 64,
				// range: [0, 8, 16, 32, 64],
				// color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				range: [0, 64],
				color: ["l(0) 0:#39B8FF 1:#e35767"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart4() {
			const gaugePlot = new Gauge(document.getElementById("container4"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "磁盘使用量",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 664,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用量",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 1024,
				range: [0, 256, 512, 768, 1024],
				color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart5() {
			const gaugePlot = new Gauge(document.getElementById("container5"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "磁盘使用量",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用量",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 100,
				range: [0, 25, 50, 75, 100],
				color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart6() {
			const gaugePlot = new Gauge(document.getElementById("container6"), {
				title: {
					visible: true,
					alignTo: "middle",
					text: "磁盘使用量",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用量",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: 100,
				range: [0, 25, 50, 75, 100],
				color: ["#39B8FF", "#52619B", "#43E089", "#C0EDF3"],
				rangeSize: 6,
			});
			gaugePlot.render();
		},
		chart7() {
			const data = this.data7;
			const linePlot = new Line("container7", {
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
	},
};
</script>


<style scoped>
.perf {
	background-color: #f7f7f9;
}

.grid-content {
	box-sizing: border-box;
	padding: 0 40px;
}

.canvas-chart {
	height: 200px;
}

.canvas-chart7 {
	height: 480px;
}
</style>