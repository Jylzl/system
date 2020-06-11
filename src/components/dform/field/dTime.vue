<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-15 17:34:24
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-18 12:40:22
 -->
<template>
  <div>
    <el-time-picker
      v-model="s_value"
      :name="s_prop"
      :placeholder="s_placeholder"
      :start-placeholder="s_startPlaceholder"
      :end-placeholder="s_endPlaceholder"
      :editable="b_editable"
      :align="s_align"
      :range-separator="s_rangeSeparator"
      :readonly="b_readonly"
      :disabled="b_disabled"
      :clearable="b_clearable"
      :default-value="s_defaultValue"
      :picker-options="o_pickerOptions"
      :arrow-control="b_arrowControl"
      :is-range="b_isRange"
      :value-format="s_valueFormat"
      class="w100"
      v-if="s_type == 'picker'"
    ></el-time-picker>
    <el-time-select
      v-model="s_value"
      :name="s_prop"
      :placeholder="s_placeholder"
      :start-placeholder="s_startPlaceholder"
      :end-placeholder="s_endPlaceholder"
      :editable="b_editable"
      :align="s_align"
      :range-separator="s_rangeSeparator"
      :readonly="b_readonly"
      :disabled="b_disabled"
      :clearable="b_clearable"
      :default-value="s_defaultValue"
      :picker-options="o_selectOptions"
      class="w100"
      v-if="s_type == 'select'"
    ></el-time-select>
    <p>{{ s_value }}</p>
  </div>
</template>

<script>
export default {
  name: "d-time",
  props: {
    prop: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "picker"
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "选择时间"
    },
    startPlaceholder: {
      type: String,
      default: "起始时间"
    },
    endPlaceholder: {
      type: String,
      default: "结束时间"
    },
    editable: {
      type: Boolean,
      default: true
    },
    arrowControl: {
      type: Boolean,
      default: false
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
    valueFormat: {
      type: String,
      default: "HH:mm:ss"
    },
    align: {
      type: String,
      default: "left"
    },
    rangeSeparator: {
      type: String,
      default: "-"
    },
    defaultValue: {
      type: String,
      default: ""
    },
    isRange: {
      type: Boolean,
      default: false
    },
    start: {
      type: String,
      default: "00:00"
    },
    end: {
      type: String,
      default: "23:59"
    },
    step: {
      type: String,
      default: "00:30"
    },
    minTime: {
      type: String,
      default: "00:00"
    },
    maxTime: {
      type: String,
      default: "24:00"
    },
    format: {
      type: String,
      default: "'HH:mm:ss"
    },
    selectableRange: {
      type: String,
      default: "0:00:00 - 23:59:59"
    }
  },
  data() {
    return {
      s_prop: this.prop,
      s_type: this.type,
      s_value: this.value,
      s_placeholder: this.placeholder,
      s_startPlaceholder: this.startPlaceholder,
      s_endPlaceholder: this.endPlaceholder,
      b_editable: this.editable,
      b_disabled: this.disabled,
      b_readonly: this.readonly,
      b_clearable: this.clearable,
      s_valueFormat: this.valueFormat,
      s_align: this.align,
      s_rangeSeparator: this.rangeSeparator,
      s_defaultValue: this.defaultValue,
      b_arrowControl: this.arrowControl,
      b_isRange: this.isRange,
      o_pickerOptions: {
        selectableRange: this.selectableRange,
        format: this.format
      },
      o_selectOptions: {
        start: this.start,
        step: this.step,
        end: this.end,
        minTime: this.minTime,
        maxTime: this.maxTime
      }
    };
  }
};
</script>

<style scoped>
.w100 {
  width: 100%;
}
</style>
