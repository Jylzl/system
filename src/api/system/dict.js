/**
 * @description: 字典接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 15:22:26
 */

import request from '@/utils/request'

export function getDict(params) {
  return request({
    url: '/api/dict',
    params,
    method: 'get'
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
    url: '/api/dict/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/dict/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/dict/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function getDictItemByType(type) {
  return request({
    url: '/api/dict/type/' + type,
    method: 'get'
  })
}