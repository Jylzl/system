<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-12 14:35:17
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-15 14:12:06
--> 
<template>
	<div class="baidu">
		<div class="baidu-traffic">
			<el-card class="custom-card" shadow="never" :body-style="{ padding: '0px' }">
				<div slot="header" class="clearfix w100">
					<span>今日流量</span>
					<el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"></el-button>
				</div>
				<div class="charts-box">
					<div class="table-list">
						<table cellspacing="0" cellpadding="0" class="list">
							<tbody>
								<tr class="title">
									<th></th>
									<th>浏览量(PV)</th>
									<th>访客数(UV)</th>
									<th>IP数</th>
									<th>跳出率</th>
									<th>平均访问时长</th>
									<th>转化次数</th>
									<th class="empty-tr0"></th>
								</tr>
								<tr class="highlight">
									<td class="normal">今日</td>
									<td class>2</td>
									<td class>1</td>
									<td class>1</td>
									<td class>0%</td>
									<td class>00:00:03</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr>
									<td class="normal">昨日</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr>
									<td class="normal">预计今日</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr class="empty-tr1"></tr>
								<tr class="fade empty-tr2" :class="{'toggleable-hidden':!trafficState}">
									<td colspan="9"></td>
								</tr>
								<tr class="fade" :class="{'toggleable-hidden':!trafficState}">
									<td class="normal">昨日此时</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr class="fade" :class="{'toggleable-hidden':!trafficState}">
									<td class="normal">每日平均</td>
									<td class>2</td>
									<td class>0</td>
									<td class>0</td>
									<td class>33.33%</td>
									<td class>00:05:24</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr class="fade" :class="{'toggleable-hidden':!trafficState}">
									<td class="normal">历史峰值</td>
									<td d="2020年09月04日" title="峰值日：2020/09/04" class="highlight-tip">26</td>
									<td d="2020年09月09日" title="峰值日：2020/09/09" class="highlight-tip">3</td>
									<td d="2020年09月09日" title="峰值日：2020/09/09" class="highlight-tip">3</td>
									<td d="2020年08月25日" title="峰值日：2020/08/25" class="highlight-tip">100%</td>
									<td d="2020年09月04日" title="峰值日：2020/09/04" class="highlight-tip">00:27:49</td>
									<td class>--</td>
									<td class="empty-tr0"></td>
								</tr>
								<tr class="fade empty-tr3" :class="{'toggleable-hidden':!trafficState}">
									<td colspan="9"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="fold" :class="{'btw':!trafficState}">
						<a
							href="javascript:void(0)"
							id="TogglePreviewTableBtn"
							targets=".fade"
							class="toggleable recordable trackable"
							:class="trafficState?'open':'close'"
							@click="trafficState = !trafficState"
						></a>
					</div>
				</div>
			</el-card>
		</div>
		<div class="overview-detail m-t-18">
			<div class="control-bar-wrapper">
				<el-radio-group v-model="controlBar" size="mini">
					<el-radio-button label="1">今天</el-radio-button>
					<el-radio-button label="2">昨天</el-radio-button>
					<el-radio-button label="3">最近7天</el-radio-button>
					<el-radio-button label="4">最近30天</el-radio-button>
				</el-radio-group>
			</div>
			<div class="index-site">
				<el-row :gutter="20" class="table-grid">
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">
								<span>趋势图</span>
								<div style="float:right;">
									<el-radio-group v-model="controlBar" size="mini">
										<el-radio-button label="1">浏览量(PV)</el-radio-button>
										<el-radio-button label="2">IP数</el-radio-button>
										<el-radio-button label="3">跳出率</el-radio-button>
										<el-radio-button label="4">平均访问时长</el-radio-button>
										<el-radio-button label="5">转化次数</el-radio-button>
									</el-radio-group>
								</div>
							</div>
							<div class="canvas-box">
								<div id="canvas1"></div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">Top10搜索词</div>
							<div class="table-data clearfix">
								<table cellpadding="0" cellspacing="0" class="table-layout-01">
									<thead>
										<tr>
											<td class="al url">搜索词</td>
											<td class="ar" width="20%">浏览量(PV)</td>
											<td class="ratio" width="20%">占比</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感">孝感</span>
											</td>
											<td class="ar">177</td>
											<td class="ratio">
												<div title="8.83%" style="background-color:#DCEBFE; width:8.83%;">8.83%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感市人民政府">孝感市人民政府</span>
											</td>
											<td class="ar">148</td>
											<td class="ratio">
												<div title="7.39%" style="background-color:#DCEBFE; width:7.39%;">7.39%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感市政府">孝感市政府</span>
											</td>
											<td class="ar">114</td>
											<td class="ratio">
												<div title="5.69%" style="background-color:#DCEBFE; width:5.69%;">5.69%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感市">孝感市</span>
											</td>
											<td class="ar">103</td>
											<td class="ratio">
												<div title="5.14%" style="background-color:#DCEBFE; width:5.14%;">5.14%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="site:www.xiaogan.gov.cn">site:www.xiaogan.gov.cn</span>
											</td>
											<td class="ar">43</td>
											<td class="ratio">
												<div title="2.15%" style="background-color:#DCEBFE; width:2.15%;">2.15%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感市政府网">孝感市政府网</span>
											</td>
											<td class="ar">41</td>
											<td class="ratio">
												<div title="2.05%" style="background-color:#DCEBFE; width:2.05%;">2.05%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感市人民政府官网">孝感市人民政府官网</span>
											</td>
											<td class="ar">39</td>
											<td class="ratio">
												<div title="1.95%" style="background-color:#DCEBFE; width:1.95%;">1.95%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="孝感网">孝感网</span>
											</td>
											<td class="ar">32</td>
											<td class="ratio">
												<div title="1.6%" style="background-color:#DCEBFE; width:1.6%;">1.6%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="2020孝感市宣教月线上知识测试">2020孝感市宣教月线上知识测试</span>
											</td>
											<td class="ar">25</td>
											<td class="ratio">
												<div title="1.25%" style="background-color:#DCEBFE; width:1.25%;">1.25%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="湖北孝感市">湖北孝感市</span>
											</td>
											<td class="ar">24</td>
											<td class="ratio">
												<div title="1.2%" style="background-color:#DCEBFE; width:1.2%;">1.2%</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">Top10来源网站</div>
							<div class="table-data clearfix">
								<table cellpadding="0" cellspacing="0" class="table-layout-01">
									<thead>
										<tr>
											<td class="al url">来源网站</td>
											<td class="ar" width="20%">浏览量(PV)</td>
											<td class="ratio" width="20%">占比</td>
										</tr>
									</thead>
									<tbody id="source-site-container">
										<tr>
											<td class="al url">
												<span class="ellipsis" title="直接访问">直接访问</span>
											</td>
											<td class="ar">3,802</td>
											<td class="ratio">
												<div title="50.18%" style="background-color:#dcebfe; width:50.18%;">50.18%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="百度">百度</span>
											</td>
											<td class="ar">1,680</td>
											<td class="ratio">
												<div title="22.18%" style="background-color:#dcebfe; width:22.18%;">22.18%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="360搜索">360搜索</span>
											</td>
											<td class="ar">987</td>
											<td class="ratio">
												<div title="13.03%" style="background-color:#dcebfe; width:13.03%;">13.03%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="搜狗">搜狗</span>
											</td>
											<td class="ar">318</td>
											<td class="ratio">
												<div title="4.2%" style="background-color:#dcebfe; width:4.2%;">4.2%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="www.hubei.gov.cn">www.hubei.gov.cn</span>
											</td>
											<td class="ar">145</td>
											<td class="ratio">
												<div title="1.91%" style="background-color:#dcebfe; width:1.91%;">1.91%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="神马搜索">神马搜索</span>
											</td>
											<td class="ar">131</td>
											<td class="ratio">
												<div title="1.73%" style="background-color:#dcebfe; width:1.73%;">1.73%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="www.hao123.com">www.hao123.com</span>
											</td>
											<td class="ar">91</td>
											<td class="ratio">
												<div title="1.2%" style="background-color:#dcebfe; width:1.2%;">1.2%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="www.xgjw.gov.cn">www.xgjw.gov.cn</span>
											</td>
											<td class="ar">71</td>
											<td class="ratio">
												<div title="0.94%" style="background-color:#dcebfe; width:0.94%;">0.94%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="www.yingcheng.gov.cn">www.yingcheng.gov.cn</span>
											</td>
											<td class="ar">50</td>
											<td class="ratio">
												<div title="0.66%" style="background-color:#dcebfe; width:0.66%;">0.66%</div>
											</td>
										</tr>
										<tr>
											<td class="al url">
												<span class="ellipsis" title="其他">其他</span>
											</td>
											<td class="ar">301</td>
											<td class="ratio">
												<div title="3.97%" style="background-color:#dcebfe; width:3.97%;">3.97%</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">Top10入口页面</div>
							<div class="table-data clearfix">
								<table cellpadding="0" cellspacing="0" class="table-layout-01">
									<thead>
										<tr>
											<td class="al url">入口页面</td>
											<td class="ar" width="20%">浏览量(PV)</td>
											<td class="ratio" width="20%">占比</td>
										</tr>
									</thead>
									<tbody id="landing-page-container">
										<tr>
											<td title="http://www.xiaogan.gov.cn" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn"
												>http://www.xiaogan.gov.cn</a>
											</td>
											<td class="ar">3,788</td>
											<td class="ratio">
												<div title="49.97%" style="background-color:#dcebfe; width:49.97%;">49.97%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xn/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xn/index.jhtml"
												>http://www.xiaogan.gov.cn/xn/index.jhtml</a>
											</td>
											<td class="ar">564</td>
											<td class="ratio">
												<div title="7.44%" style="background-color:#dcebfe; width:7.44%;">7.44%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xsqzw/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xsqzw/index.jhtml"
												>http://www.xiaogan.gov.cn/xsqzw/index.jhtml</a>
											</td>
											<td class="ar">274</td>
											<td class="ratio">
												<div title="3.61%" style="background-color:#dcebfe; width:3.61%;">3.61%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/index.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/index.jhtml</a>
											</td>
											<td class="ar">167</td>
											<td class="ratio">
												<div title="2.2%" style="background-color:#dcebfe; width:2.2%;">2.2%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/bmdh/1120273.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/bmdh/1120273.jhtml"
												>http://www.xiaogan.gov.cn/bmdh/1120273.jhtml</a>
											</td>
											<td class="ar">73</td>
											<td class="ratio">
												<div title="0.96%" style="background-color:#dcebfe; width:0.96%;">0.96%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/cwjxs/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/cwjxs/index.jhtml"
												>http://www.xiaogan.gov.cn/cwjxs/index.jhtml</a>
											</td>
											<td class="ar">59</td>
											<td class="ratio">
												<div title="0.78%" style="background-color:#dcebfe; width:0.78%;">0.78%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgxw/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgxw/index.jhtml"
												>http://www.xiaogan.gov.cn/xgxw/index.jhtml</a>
											</td>
											<td class="ar">52</td>
											<td class="ratio">
												<div title="0.69%" style="background-color:#dcebfe; width:0.69%;">0.69%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/lmh/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/lmh/index.jhtml"
												>http://www.xiaogan.gov.cn/lmh/index.jhtml</a>
											</td>
											<td class="ar">51</td>
											<td class="ratio">
												<div title="0.67%" style="background-color:#dcebfe; width:0.67%;">0.67%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/wht01/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/wht01/index.jhtml"
												>http://www.xiaogan.gov.cn/wht01/index.jhtml</a>
											</td>
											<td class="ar">42</td>
											<td class="ratio">
												<div title="0.55%" style="background-color:#dcebfe; width:0.55%;">0.55%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/bmdh/1119829.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/bmdh/1119829.jhtml"
												>http://www.xiaogan.gov.cn/bmdh/1119829.jhtml</a>
											</td>
											<td class="ar">35</td>
											<td class="ratio">
												<div title="0.46%" style="background-color:#dcebfe; width:0.46%;">0.46%</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">Top10受访页面</div>
							<div class="table-data clearfix">
								<table cellpadding="0" cellspacing="0" class="table-layout-01">
									<thead>
										<tr>
											<td class="al url">受访页面</td>
											<td class="ar" width="20%">浏览量(PV)</td>
											<td class="ratio" width="20%">占比</td>
										</tr>
									</thead>
									<tbody id="visit-page-container">
										<tr>
											<td title="http://www.xiaogan.gov.cn" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn"
												>http://www.xiaogan.gov.cn</a>
											</td>
											<td class="ar">1,530</td>
											<td class="ratio">
												<div title="20.19%" style="background-color:#dcebfe; width:20.19%;">20.19%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/1121443.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/1121443.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/1121443.jhtml</a>
											</td>
											<td class="ar">187</td>
											<td class="ratio">
												<div title="2.47%" style="background-color:#dcebfe; width:2.47%;">2.47%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/1121281.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/1121281.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/1121281.jhtml</a>
											</td>
											<td class="ar">161</td>
											<td class="ratio">
												<div title="2.12%" style="background-color:#dcebfe; width:2.12%;">2.12%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/1121282.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/1121282.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/1121282.jhtml</a>
											</td>
											<td class="ar">132</td>
											<td class="ratio">
												<div title="1.74%" style="background-color:#dcebfe; width:1.74%;">1.74%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/wht01/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/wht01/index.jhtml"
												>http://www.xiaogan.gov.cn/wht01/index.jhtml</a>
											</td>
											<td class="ar">122</td>
											<td class="ratio">
												<div title="1.61%" style="background-color:#dcebfe; width:1.61%;">1.61%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/1121283.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/1121283.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/1121283.jhtml</a>
											</td>
											<td class="ar">113</td>
											<td class="ratio">
												<div title="1.49%" style="background-color:#dcebfe; width:1.49%;">1.49%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/1121442.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/1121442.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/1121442.jhtml</a>
											</td>
											<td class="ar">112</td>
											<td class="ratio">
												<div title="1.48%" style="background-color:#dcebfe; width:1.48%;">1.48%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/xgyw/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/xgyw/index.jhtml"
												>http://www.xiaogan.gov.cn/xgyw/index.jhtml</a>
											</td>
											<td class="ar">109</td>
											<td class="ratio">
												<div title="1.44%" style="background-color:#dcebfe; width:1.44%;">1.44%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/whtzy/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/whtzy/index.jhtml"
												>http://www.xiaogan.gov.cn/whtzy/index.jhtml</a>
											</td>
											<td class="ar">80</td>
											<td class="ratio">
												<div title="1.06%" style="background-color:#dcebfe; width:1.06%;">1.06%</div>
											</td>
										</tr>
										<tr>
											<td title="http://www.xiaogan.gov.cn/wht/index.jhtml" class="al url">
												<a
													target="_blank"
													class="ellipsis"
													href="http://www.xiaogan.gov.cn/wht/index.jhtml"
												>http://www.xiaogan.gov.cn/wht/index.jhtml</a>
											</td>
											<td class="ar">74</td>
											<td class="ratio">
												<div title="0.98%" style="background-color:#dcebfe; width:0.98%;">0.98%</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">新老访客</div>
							<div class="table-data clearfix" id="visitor-type-container">
								<div class="visit-type-summary clearfix">
									<table>
										<tbody>
											<tr>
												<td class="visit-type-icon">
													<div></div>
												</td>
												<td class="visit-type-new">
													<div>
														<div class="visit-type-summary-title">新访客</div>
														<div class="visit-type-summary-data">
															53.68
															<span class="ratil-unit">%</span>
														</div>
													</div>
												</td>
												<td class="visit-type-old">
													<div>
														<div class="visit-type-summary-title">老访客</div>
														<div class="visit-type-summary-data">
															46.32
															<span class="ratil-unit">%</span>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="visit-type-detail">
									<table>
										<tbody>
											<tr>
												<td class="visit-type-detail-name">浏览量</td>
												<td class="visit-type-detail-new">3295</td>
												<td class="visit-type-detail-old">4284</td>
											</tr>
											<tr>
												<td class="visit-type-detail-name">访客数</td>
												<td class="visit-type-detail-new">1254</td>
												<td class="visit-type-detail-old">1082</td>
											</tr>
											<tr>
												<td class="visit-type-detail-name">跳出率</td>
												<td class="visit-type-detail-new">79.57%</td>
												<td class="visit-type-detail-old">54.19%</td>
											</tr>
											<tr>
												<td class="visit-type-detail-name">平均访问时长</td>
												<td class="visit-type-detail-new">00:02:44</td>
												<td class="visit-type-detail-old">00:05:16</td>
											</tr>
											<tr>
												<td class="visit-type-detail-name">平均访问页数</td>
												<td class="visit-type-detail-new">2.3</td>
												<td class="visit-type-detail-old">3.02</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">访客属性-年龄分布</div>
							<div class="canvas-box">
								<div id="canvas2"></div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="m-t-10">
						<el-card class="custom-card table-grid-item" shadow="never" :body-style="{ padding: '0px' }">
							<div slot="header" class="clearfix w100">地域分布</div>
							<div class="table-data clearfix"></div>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
	<!-- <div class="baidu-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <iframe @load="iframeLoad" src="https://tongji.baidu.com/web/welcome/ico?s=1d4ec18a7cbce647ca4de2f7f0e3df7e"
            frameborder="0" width="100%" height="100%"></iframe>
	</div>-->
</template>
<script>
import { Area, Column } from "@antv/g2plot";
export default {
	data() {
		return {
			loading: true,
			trafficState: false,
			controlBar: "1",
			baidu: {
				id: "22646603",
				APIKey: "toUWGhRViw1DVE1DUgRrGTSZ",
				SecretKey: "A1W0MyoInKwzX5jO6LNtKl1cCvidB2wO",
			},
			data1: [
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
				{ year: "15:00", value: 3 },
				{ year: "16:00", value: 2 },
				{ year: "17:00", value: 4 },
				{ year: "18:00", value: 4 },
				{ year: "19:00", value: 7 },
				{ year: "20:00", value: 4 },
				{ year: "21:00", value: 9 },
				{ year: "22:00", value: 4 },
				{ year: "23:00", value: 6 },
			],
			data2: [
				{
					type: "18岁以下",
					sales: 38,
				},
				{
					type: "18-24岁",
					sales: 52,
				},
				{
					type: "25-34岁",
					sales: 61,
				},
				{
					type: "35-44岁",
					sales: 145,
				},
				{
					type: "45-54岁",
					sales: 48,
				},
				{
					type: "55岁以上",
					sales: 38,
				},
			],
		};
	},
	mounted() {
		this.chart1();
		this.chart2();
	},
	methods: {
		chart1() {
			const data = this.data1;
			const areaPlot = new Area("canvas1", {
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
				color: "#4da7fd",
				areaStyle: {
					fill: "#e5f2fe",
					lineWidth: 2,
					lineDash: [4, 5],
					shadowBlur: 10,
					shadowOffsetX: 5,
					shadowOffsetY: 5,
					cursor: "pointer",
				},
			});
			areaPlot.render();
		},
		chart2() {
			const data = this.data2;
			const columnPlot = new Column("canvas2", {
				title: {
					visible: false,
					text: "访客属性-年龄分布 ",
				},
				color: "#4fa8f9",
				forceFit: true,
				data,
				padding: "auto",
				xField: "type",
				yField: "sales",
				meta: {
					type: {
						alias: "年龄段",
					},
					sales: {
						alias: "占比",
					},
				},
			});
			columnPlot.render();
		},
	},
};
</script>
<style scoped>
@import url(../../assets/css/overview_sole.css);
.m-t-18 {
	margin-top: 18px;
}
.m-t-10 {
	margin-top: 10px;
}
.baidu {
	height: 100%;
	background-color: #f7f7f9;
	font-size: 13px;
}
.baidu a,
.baidu a:hover {
	color: #1276e5;
}
.baidu-box {
	height: 100%;
	width: 100%;
	overflow: hidden;
}
.canvas-box {
	height: 333px;
}
.canvas-box #canvas1,
.canvas-box #canvas2 {
	height: 333px;
}
</style>