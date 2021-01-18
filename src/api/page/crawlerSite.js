/**
 * @description: 采集站点管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 15:34:26
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/crawler/site',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/crawler/site',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/crawler/site/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/crawler/site/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/crawler/site/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function checkObj(params) {
  return request({
    url: '/api/crawler/site/check',
    params,
    method: 'get'
  })
}