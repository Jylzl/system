/**
 * @description: 字典接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 14:05:34
 */

import request from '@/utils/request'

export function getDictItem(params) {
  return request({
    url: '/api/dictitem',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/dictitem',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/dictitem/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/dictitem/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/dictitem/' + obj.id,
    method: 'put',
    data: obj
  })
}
