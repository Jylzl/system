/**
 * @description: 菜单接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 09:46:02
 */

import request from '@/utils/request'

export function getMenu(params) {
  return request({
    url: '/api/menu',
    params,
    method: 'get'
  })
}

export function getTopMenu() {
  return request({
    url: '/api/menu',
    params: { type: 'top' },
    method: 'get'
  })
}

export function fetchMenuTree(lazy, parent_id) {
  return request({
    url: '/api/menu/tree',
    method: 'get',
    params: { lazy, parent_id }
  })
}

export function addObj(obj) {
  return request({
    url: '/api/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/menu/' + obj.id,
    method: 'put',
    data: obj
  })
}
