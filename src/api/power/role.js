/**
 * @description: 菜单接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 09:57:01
 */

import request from '@/utils/request'

export function getRole(params) {
  return request({
    url: '/api/role',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/role',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/role/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/role/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/role/' + obj.id,
    method: 'put',
    data: obj
  })
}