/**
 * @description: 采集接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 23:30:13
 */
import request from '@/utils/request'

export function getObj(params) {
  return request({
    url: '/api/crawler/column',
    params,
    method: 'get'
  })
}
export function crawlerObj(obj) {
  return request({
    url: '/api/crawler/column',
    method: 'post',
    data: obj
  })
}