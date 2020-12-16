/**
 * @description: 地区接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 23:00:17
 */

import request from '@/utils/request'

export function getArea(params) {
  return request({
    url: '/api/area',
    params,
    method: 'get'
  })
}

export function getTopArea() {
  return request({
    url: '/api/area',
    params: { type: 'top' },
    method: 'get'
  })
}

export function fetchAreaTree(lazy, parent_id) {
  return request({
    url: '/api/area/tree',
    method: 'get',
    params: { lazy, parent_id }
  })
}

export function addObj(obj) {
  return request({
    url: '/api/area',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/area/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/area/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/area/' + obj.id,
    method: 'put',
    data: obj
  })
}
