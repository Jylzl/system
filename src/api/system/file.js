/**
 * @description: 文件接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-22 16:52:58
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/upload',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/upload',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/upload/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/upload/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/upload/' + obj.id,
    method: 'put',
    data: obj
  })
}