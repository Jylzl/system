/**
 * @description: 采集任务管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-22 08:54:39
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/crawler/content',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/crawler/content',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/crawler/content/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/crawler/content/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/crawler/content/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function collectObj(params) {
  return request({
    url: '/api/crawler/content/collect',
    params,
    method: 'get'
  })
}

export function progressObj(params) {
  return request({
    url: '/api/crawler/content/progress',
    params,
    method: 'get'
  })
}