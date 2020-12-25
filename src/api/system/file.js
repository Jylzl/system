/**
 * @description: 文件接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 16:59:19
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/file',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/file',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/file/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/file/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/file/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function downObj(id) {
  return request({
    url: '/api/file/down/' + id,
    method: 'get'
  })
}