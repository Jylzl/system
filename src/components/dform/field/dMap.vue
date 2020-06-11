<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-16 09:13:01
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-19 08:39:55
 -->
<template>
	<div>
		<el-input placeholder="请选择地址" v-model="address">
			<el-button slot="append" icon="el-icon-map-location" @click="dialogVisible = true"></el-button>
		</el-input>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="860px"
			:destroy-on-close="true"
			class="map-dialog"
		>
			<span slot="title" class="dialog-title">坐标: [{{ place.lng }}, {{ place.lat }}]</span>
			<div>
				<div class="amap-page-container">
					<el-amap-search-box
						class="search-box"
						:search-option="searchOption"
						:on-search-result="onSearchResult"
					></el-amap-search-box>
					<el-amap
						ref="map"
						vid="amapDemo"
						class="amap-demo"
						:center="center"
						:zoom="zoom"
						:plugin="plugin"
						:events="events"
					>
						<el-amap-info-window
							v-for="(marker,index) in markers"
							:position="marker.position"
							:content="marker.address"
							:key="index"
						>
							<div>
								<h4>{{marker.address}}</h4>
								<p>坐标: [{{ marker.position[0] }}, {{ marker.position[1] }}]</p>
							</div>
						</el-amap-info-window>
						<!-- <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index"></el-amap-marker> -->
					</el-amap>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" type="primary" @click="dialogVisible = false">确定</el-button>
				<el-button size="small" @click="dialogVisible = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: "d-map",
	data() {
		const self = this;
		return {
			place: {
				lng: 114.304774,
				lat: 30.592376,
				address: "湖北省武汉市江岸区一元街街道洞庭街武汉市人民政府"
			},
			dialogVisible: false,
			center: [114.304774, 30.592376],
			zoom: 12,
			searchOption: {
				city: "",
				citylimit: true
			},
			address: "",
			loaded: false,
			show: false,
			markers: [
				{
					position: [114.304774, 30.592376],
					address: "湖北省武汉市江岸区一元街街道洞庭街武汉市人民政府"
				}
			],
			events: {
				init: o => {
					AMap.service("AMap.Autocomplete", function() {});
					AMap.service("AMap.ToolBar", function() {});
					AMap.service("AMap.Geolocation", function() {});
				},
				moveend: () => {},
				zoomchange: () => {},
				click: e => {
					let { lng, lat } = e.lnglat;
					self.place.lng = lng;
					self.place.lat = lat;
					this.markers = [];
					this.center = [lng, lat];

					AMap.service("AMap.Geocoder", function() {
						var geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: "all",
							city: "010"
						});
						geocoder.getAddress([lng, lat], function(
							status,
							result
						) {
							if (status === "complete" && result.info === "OK") {
								self.markers.push({
									position: [lng, lat],
									address: result.regeocode.formattedAddress
								});

								self.place.address =
									result.regeocode.formattedAddress;
								self.$nextTick();
							}
						});
					});
				}
			},
			plugin: [
				"ToolBar",
				{
					pName: "Scale",
					events: {
						init(instance) {
							console.log(instance);
						}
					}
				},
				{
					pName: "Geolocation",
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.center = [self.lng, self.lat];
									self.loaded = true;
									self.$nextTick();
								}
							});
						}
					}
				}
			]
		};
	},
	methods: {
		onSearchResult(pois) {
			let latSum = 0;
			let lngSum = 0;
			if (pois.length > 0) {
				pois.forEach(poi => {
					let { lng, lat } = poi;
					lngSum += lng;
					latSum += lat;
					this.markers.push({
						position: [poi.lng, poi.lat],
						address: poi.address
					});
				});
				let center = {
					lng: lngSum / pois.length,
					lat: latSum / pois.length
				};
				this.center = [center.lng, center.lat];
				this.zoom = 19;
			}
		}
	}
};
</script>

<style>
.map-dialog .el-dialog__body {
	padding: 0;
}
</style>

<style scoped>
.amap-demo {
	height: 460px;
}

.amap-page-container {
	position: relative;
	height: 460px;
}

.search-box {
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 10;
	width: 220px;
	height: 40px;
}
</style>