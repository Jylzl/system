/**
 * @description: 部门接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 09:16:08
 */

import request from '@/utils/request'

export function getDept(params) {
  return request({
    url: '/api/dept',
    params,
    method: 'get'
  })
}

export function getTopDept() {
  return request({
    url: '/api/dept',
    params: { type: 'top' },
    method: 'get'
  })
}

export function fetchDeptTree(lazy, parent_id) {
  return request({
    url: '/api/dept/tree',
    method: 'get',
    params: { lazy, parent_id }
  })
}

export function addObj(obj) {
  return request({
    url: '/api/dept',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/dept/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/dept/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/dept/' + obj.id,
    method: 'put',
    data: obj
  })
}
