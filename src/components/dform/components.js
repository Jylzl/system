/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-08 12:53:26
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-24 16:31:06
 */
let components = [{
  id: 1,
  label: "输入字段",
  children: [{
    id: 101,
    label: "文本框",
    span: 24,
    icon: "icon-input",
    component: "d-input",
    type: "text",
    dataType: "string",
  }, {
    id: 102,
    label: "富文本",
    span: 24,
    icon: "icon-richtext",
    component: "d-richText",
    type: "cms-tinymce",
    dataType: "string",
  }, {
    id: 103,
    label: "计数器",
    span: 24,
    icon: "icon-number",
    component: "d-number",
    dataType: "number",
    controls: true
  }]
}, {
  id: 20,
  label: "选择字段",
  children: [{
    id: 201,
    label: "单选框",
    span: 24,
    icon: "icon-radio",
    component: "d-radio",
    dataType: "array",
  }, {
    id: 202,
    label: "多选框组",
    span: 24,
    icon: "icon-checkbox",
    component: "d-checkbox",
    dataType: "array",
  }, {
    id: 203,
    label: "下拉选择器",
    span: 24,
    icon: "icon-select",
    component: "d-select",
    dataType: "array",
  }, {
    id: 204,
    label: "级联选择器",
    span: 24,
    icon: "icon-link",
    component: "d-cascader",
    dataType: "array",
  }, {
    id: 205,
    label: "开关选择器",
    span: 24,
    icon: "icon-switch",
    component: "d-switch",
    dataType: "boolean",
  }, {
    id: 206,
    label: "颜色选择器",
    span: 24,
    icon: "icon-color",
    component: "d-colorPicker",
    dataType: "string",
  }, {
    id: 207,
    label: "滑块选择器",
    span: 24,
    icon: "icon-slider",
    component: "d-slider",
    dataType: "array",
  }, {
    id: 208,
    label: "评分选择器",
    span: 24,
    icon: "icon-star",
    component: "d-rate",
    dataType: "number",
  }]
}, {
  id: 3,
  label: "上传字段",
  children: [{
    id: 301,
    label: "附件上传",
    span: 24,
    icon: "icon-upload",
    component: "d-upload",
    dataType: "array",
  }]
}, {
  id: 4,
  label: "时间日期字段",
  children: [{
    id: 401,
    label: "时间选择器",
    span: 24,
    icon: "icon-time",
    component: "d-time",
    dataType: "array",
  }, {
    id: 402,
    label: "日期选择器",
    span: 24,
    icon: "icon-date",
    component: "d-date",
    dataType: "array",
  }, {
    id: 403,
    label: "日期时间选择器",
    span: 24,
    icon: "icon-datetime",
    component: "d-dateTime",
    dataType: "array",
  }]
}, {
  id: 5,
  label: "扩展字段",
  children: [{
    id: 501,
    label: "坐标选择器",
    span: 24,
    icon: "icon-map",
    component: "d-map",
    dataType: "string",
  }]
}, {
  id: 6,
  label: "自定义字段"
}]

export {
  components
};