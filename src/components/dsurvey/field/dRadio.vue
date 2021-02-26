<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-18 11:30:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-08 08:50:04
 -->
<template>
	<el-radio-group v-model="radio" class="w100">
		<el-row>
			<el-col :span="24">
				<div class="survey-radio">
					<el-radio label="1" style="line-height:2;">选项1</el-radio>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="survey-radio">
					<el-radio label="2" style="line-height:2;">选项2</el-radio>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="survey-radio">
					<el-radio label="3" style="line-height:2;">选项3</el-radio>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="survey-radio">
					<el-radio label="4" style="line-height:2;">选项4</el-radio>
				</div>
			</el-col>
		</el-row>
	</el-radio-group>
</template>

<script>
export default {
	name: "d-radio",
	data() {
		return {
			radio: "1",
		};
	},
};
</script>

<style>
.survey-radio {
	width: 100%;
	line-height: 2.25;
}
</style>