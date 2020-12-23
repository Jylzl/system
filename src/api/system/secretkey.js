/**
 * @description: 密钥管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 15:42:32
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/secretkey',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/secretkey',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/secretkey/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/secretkey/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/secretkey/' + obj.id,
    method: 'put',
    data: obj
  })
}