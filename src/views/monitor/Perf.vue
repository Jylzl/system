<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-08 10:59:14
-->
<template>
	<div class="perf" v-loading="loading">
		<div>
			<el-row :gutter="20">
				<el-col :span="16">
					<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
						<div slot="header" class="clearfix w100">
							<span>
								服务器状态
								<span style="font-size:12px; color:#999;">(上次更新时间：{{time}})</span>
							</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								icon="el-icon-refresh"
								@click="getSysInf"
								title="立即更新"
							></el-button>
						</div>
						<div class="canvas-box">
							<el-row :gutter="20">
								<el-col :span="6">
									<div class="grid-content bg-purple">
										<div id="container1" class="canvas-chart"></div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="grid-content bg-purple">
										<div id="container2" class="canvas-chart"></div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="grid-content bg-purple">
										<div id="container3" class="canvas-chart"></div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="grid-content bg-purple">
										<div id="container4" class="canvas-chart"></div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
						<div slot="header" class="clearfix w100">
							<span>服务器信息</span>
							<!-- <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button> -->
						</div>
						<div class="canvas-box">
							<div class="sys-inf">
								<el-table :data="tableData" border :show-header="false" style="width: 100%">
									<el-table-column prop="label" label="名称一" width="180" align="center"></el-table-column>
									<el-table-column prop="value" label="数据一" align="center"></el-table-column>
								</el-table>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
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
			loading: false,
			time: "YYYY-MM-DD hh:mm:ss",
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
			tableData: [],
			mem: {
				totalmem: null,
				freemem: null,
				usemem: null,
			},
			cpu: 0,
		};
	},
	mounted() {
		this.getSysInf();
		this.chart1();
		this.chart4();
		this.chart7();
	},
	methods: {
		getSysInf() {
			this.loading = true;
			getSysInf().then((res) => {
				const table = [
					{
						label: "主机名",
						value: res.data.hostname,
					},
					{
						label: "服务器类型",
						value: res.data.type,
					},
					{
						label: "CPU 架构",
						value: res.data.arch,
					},
					{
						label: "CPU 核心",
						value: res.data.cpus.length + "核",
					},
				];
				this.tableData = table;
				this.mem = {
					totalmem: Math.round(
						res.data.totalmem / 1024 / 1024 / 1024
					),
					freemem: (res.data.freemem / 1024 / 1024 / 1024).toFixed(2),
					usemem:
						Math.round(res.data.totalmem / 1024 / 1024 / 1024) -
						(res.data.freemem / 1024 / 1024 / 1024).toFixed(2),
				};
				const cpu = this.cpuIAverage(res.data.cpus);
				this.cpu = Math.round(
					((cpu.total - cpu.idle) / cpu.total) * 100
				);
				this.time = this.$moment().format("YYYY-MM-DD hh:mm:ss");
				this.chart2();
				this.chart3();
				this.loading = false;
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
				value: this.cpu,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: this.cpu + "%",
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
				value: this.mem.usemem,
				statistic: {
					visible: true,
					position: ["50%", "100%"],
					text: this.mem.usemem.toFixed(2) + "G",
					color: "#999",
					size: 12,
				},
				min: 0,
				max: this.mem.totalmem,
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
		// cpu使用率计算
		cpuIAverage(cpus) {
			let idle = 0,
				total = 0;
			for (let index = 0; index < cpus.length; index++) {
				let totalIdle = 0;
				let totalTick = 0;
				const cpu = cpus[index];
				for (const type in cpu.times) {
					totalTick += cpu.times[type];
				}
				totalIdle += cpu.times.idle;
				idle += totalIdle / cpus.length;
				total += totalTick / cpus.length;
			}
			return {
				idle: idle,
				total: total,
			};
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

.sys-inf,
.canvas-chart {
	height: 220px;
}

.sys-inf {
	box-sizing: border-box;
	padding: 14px;
}

.canvas-chart7 {
	height: 480px;
}
</style>