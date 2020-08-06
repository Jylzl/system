<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 11:02:30
-->
<template>
	<div class="perf">
		<div>
			<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
				<div slot="header" class="clearfix w100">
					<span>服务状态(2020-08-06 09:07)</span>
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
					<span>服务状态</span>
					<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
				</div>
				<div class="charts-box">1</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { Gauge } from "@antv/g2plot";
export default {
	data() {
		return {};
	},
	mounted() {
		this.chart1();
		this.chart2();
		this.chart3();
		this.chart4();
		this.chart5();
		this.chart6();
	},
	methods: {
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
					text: "内存使用率",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 18,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "内存使用率",
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
					text: "磁盘使用率",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 664,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用率",
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
					text: "磁盘使用率",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用率",
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
					text: "磁盘使用率",
					style: {
						fill: "#666",
						fontSize: 15,
					},
				},
				value: 64,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: "磁盘使用率",
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
</style>