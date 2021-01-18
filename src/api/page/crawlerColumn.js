/**
 * @description: 采集站点管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 16:31:15
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/crawler/column',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/crawler/column',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/crawler/column/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/crawler/column/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/crawler/column/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function checkObj(params) {
  return request({
    url: '/api/crawler/column/check',
    params,
    method: 'get'
  })
}