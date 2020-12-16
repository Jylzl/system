/**
 * @description: 给vue添加全局方法
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-02 10:57:10
 * @LastAuthor: lizlong
 * @lastTime: 2020-11-13 00:28:14
 */

import service from "@/utils/request";
import api from "@/api/api";
import code from "@/code/code";
import { deepClones } from '@/utils/tools'
import moment from "moment";
// moment.locale('zh-cn');
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})

const pageGroup = [20, 40, 100, 200];

export default {
    install(Vue) {
        Vue.prototype.$axios = service; //axios全局方法(正常form提交)
        window.axios = service;
        Vue.prototype.$api = api; //api地址全局方法
        Vue.prototype.$code = code; //code状态码全局方法
        Vue.prototype.$pageGroup = pageGroup; //分页下拉组
        Vue.prototype.deepClone = deepClones; //api地址全局方法

        //自定义类型的提示，默认警告
        Vue.prototype.message = function (value, type) {
            type = type || 'info';
            this.$message({
                showClose: true,
                message: value,
                type: type,
                duration: 2000
            });
        }

        //警告消息提示
        Vue.prototype.warningMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'warning',
                duration: 2000
            });
        }

        //成功消息提示
        Vue.prototype.successMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'success',
                duration: 2000
            });
        }

        //失败消息提示
        Vue.prototype.errorMessage = function (value) {
            this.$message({
                showClose: true,
                message: value,
                type: 'error',
                duration: 2500
            });
        }

        //表单重置
        Vue.prototype.$resetForm = function (formName) {
            this.$nextTick(() => {
                this.$refs[formName].resetFields();
            })
        }

        //时间格式化
        Vue.prototype.$moment = moment;
    }
}