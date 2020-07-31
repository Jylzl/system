/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-10 11:15:28
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 15:10:21
 */
const code = {
    success: 200, //请求成功
    timeout: 408, //请求超时
    request_abort: -200, //请求失败
    no_data: 204, //未查询到数据
    land_timeout: 401, //用户登陆超时
    land_abort: 304, //用户或密码名错误
}

export default code;