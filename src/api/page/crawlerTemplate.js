/**
 * @description: 采集模板管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 09:41:52
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/crawler/template',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/crawler/template',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/crawler/template/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/crawler/template/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/crawler/template/' + obj.id,
    method: 'put',
    data: obj
  })
}