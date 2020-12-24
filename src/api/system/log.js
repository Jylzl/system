/**
 * @description: 日志管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-24 15:31:55
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/log',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/log',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/log/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/log/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/log/' + obj.id,
    method: 'put',
    data: obj
  })
}