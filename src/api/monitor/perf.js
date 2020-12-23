/**
 * @description: 服务器信息接口
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 20:07:49
 */

import request from '@/utils/request'

export function getSysInf() {
  return request({
    url: '/api/sysinf',
    method: 'get'
  })
}