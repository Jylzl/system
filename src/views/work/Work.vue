<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 15:42:30
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-04-30 15:42:39
 -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="i in 6" :key="i" class="m-b-20">
        <div :class="'grid-content bg-purple-'+i">
          <countTo :startVal="startVal" :endVal="endVal" :duration="3000"></countTo>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-for="i in 3" :key="i" class="m-b-20">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2017
    };
  }
};
</script>
<style scoped>
.grid-content {
  height: 110px;
  line-height: 110px;
}
.bg-purple-1 {
  background: linear-gradient(90deg, #2f80ed, #54c9f2);
}
.bg-purple-2 {
  background: linear-gradient(90deg, #03c9fb, #3bd3af);
}
.bg-purple-3 {
  background: linear-gradient(90deg, #3387ed, #56ccf2);
}
.bg-purple-4 {
  background: linear-gradient(90deg, #068095, #78ffd6);
}
.bg-purple-5 {
  background: linear-gradient(90deg, #30a0ed, #55cbf2);
}
.bg-purple-6 {
  background: linear-gradient(90deg, #3286ed, #56ccf2);
}
</style>