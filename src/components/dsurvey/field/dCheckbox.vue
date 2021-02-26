<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:31:01
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 08:54:55
 -->
 <template>
	<el-checkbox-group v-model="checkedCities" :min="1" :max="2">
		<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
	</el-checkbox-group>
</template>
<script>
export default {
	name: "d-checkbox",
	data() {
		return {
			checkedCities: ["上海", "北京"],
			cities: ["上海", "北京", "广州", "深圳"],
		};
	},
};
</script>