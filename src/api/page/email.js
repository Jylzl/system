/**
 * @description: 邮件接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-28 16:45:34
 */

import request from '@/utils/request'

export function getRole(params) {
  return request({
    url: '/api/email',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/email',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/email/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/email/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/email/' + obj.id,
    method: 'put',
    data: obj
  })
}
