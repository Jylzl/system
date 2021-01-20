/**
 * @description: 采集任务管理接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 16:37:21
 */

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/crawler/task',
    params,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/api/crawler/task',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/crawler/task/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/crawler/task/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/crawler/task/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function collectObj(params) {
  return request({
    url: '/api/crawler/task/collect',
    params,
    method: 'get'
  })
}

export function progressObj(params) {
  return request({
    url: '/api/crawler/task/progress',
    params,
    method: 'get'
  })
}