/**
 * @description: 菜单接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 11:33:31
 */

import request from '@/utils/request'

export function getUser(params) {
  return request({
    url: '/api/user',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/user/' + obj.id,
    method: 'put',
    data: obj
  })
}
