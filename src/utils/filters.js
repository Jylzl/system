/**
 * @description: 全局过滤器
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-02-04 09:55:30
 * @LastAuthor: lizlong
 * @lastTime: 2021-02-04 10:30:20
 */
const moment = require('moment');
/**
 * 格式化时间
 * @param date {Date, String} 转换的时间对象
 * @param type {String} 时间格式
 * @return {String}
 */
export function momentFilter(date, type) {
  let _date = null;
  if (date === null || date === undefined || date === '') {
    _date = "";
  } else {
    _date = moment(new Date(date.replace(/(^\s*)|(\s*$)/g, ''))).format(type || 'YYYY-MM-DD HH:mm:ss');
  }
  return _date;
}

/**
 * 隐藏手机号码
 * @param val {Number, String} 转换的字符串对象
 * @param retain {Number} 保留位数
 * @return {String}
 */
export function phoneFilter(val, retain = 4) {
  if (!Number(val) || String(val).length !== 11 || retain == 0) return val;
  let digit = 11 - 3 - retain;
  let reg = new RegExp(`^(\\d{3})\\d{${digit}}(\\d{${retain}})$`);
  return val.replace(reg, `$1${'*'.repeat(digit)}$2`);
}