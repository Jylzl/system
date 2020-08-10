/**
 * @description: 菜单接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-10 18:08:15
 */

import request from '@/utils/request'

export function getMenu(params) {
  return request({
    url: '/api/menus',
    params,
    method: 'get'
  })
}

export function getTopMenu() {
  return request({
    url: '/api/menus',
    params: { type: 'top' },
    method: 'get'
  })
}

export function fetchMenuTree(lazy, parent_id) {
  return request({
    url: '/api/menus/tree',
    method: 'get',
    params: { lazy, parent_id }
  })
}

export function addObj(obj) {
  return request({
    url: '/api/menus',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/menus/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/menus/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/menus',
    method: 'put',
    data: obj
  })
}
