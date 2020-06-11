<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-15 17:34:24
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-18 12:43:33
 -->
<template>
  <div>
    <el-date-picker
      v-model="s_value"
      :name="s_prop"
      :type="s_type"
      :time-arrow-control="b_timeArrowControl"
      :placeholder="s_placeholder"
      :start-placeholder="s_startPlaceholder"
      :end-placeholder="s_endPlaceholder"
      :editable="b_editable"
      :format="s_format"
      :value-format="s_valueFormat"
      :align="s_align"
      :range-separator="s_rangeSeparator"
      :readonly="b_readonly"
      :disabled="b_disabled"
      :clearable="b_clearable"
      class="w100"
    ></el-date-picker>
    <p>{{ s_value }}</p>
  </div>
</template>

<script>
export default {
  name: "d-dateTime",
  props: {
    prop: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "datetime"
    },
    timeArrowControl: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "选择日期"
    },
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss"
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss"
    },
    align: {
      type: String,
      default: "left"
    },
    rangeSeparator: {
      type: String,
      default: "-"
    }
  },
  data() {
    return {
      s_prop: this.prop,
      s_type: this.type,
      b_timeArrowControl: this.timeArrowControl,
      s_value: this.value,
      s_placeholder: this.placeholder,
      s_startPlaceholder: this.startPlaceholder,
      s_endPlaceholder: this.endPlaceholder,
      b_editable: this.editable,
      b_disabled: this.disabled,
      b_readonly: this.readonly,
      b_clearable: this.clearable,
      s_format: this.format,
      s_valueFormat: this.valueFormat,
      s_align: this.align,
      s_rangeSeparator: this.rangeSeparator
    };
  }
};
</script>

<style scoped>
.w100 {
  width: 100%;
}
</style>
