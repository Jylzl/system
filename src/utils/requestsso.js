/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 10:10:22
 * @LastEditTime: 2019-09-06 15:00:45
 * @LastEditors: Please set LastEditors
 */

/**
 * @Description: 请求过滤器
 * @Author: lizlong<94648929@qq.com>
 * @Date: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-13 10:10:26
 */

import axios from 'axios'
import qs from 'qs'

import {
	getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
	withCredentials: true,
	baseURL: process.env.VUE_APP_SERVER_API, // api 的 base_url
	timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(
	config => {
		let params = {};

		if (getToken()) {
			// 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
			config.headers['token'] = getToken();
		}

		for (let key in config.data) {
			params[key] = config.data[key]; //添加进参数列表
		}

		config.data = qs.stringify(params); //序列化
		return config
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	}
)

// response interceptor（响应拦截器）
service.interceptors.response.use(
	// response => response,
	/**
	 * 下面的注释为通过在response里，自定义code来标示请求状态
	 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
	 * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
	 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
	 */
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error)
	}
)

export default service