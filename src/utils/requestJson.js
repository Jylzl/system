/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 08:56:26
 * @LastEditTime: 2019-09-06 15:00:52
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 请求过滤器
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-22 14:25:02
 */

import axios from 'axios'
// import qs from 'qs'
// import {
// 	store
// } from '@/store/index.js';
import router from '@/router/index'
import {
	Message
} from 'element-ui'

import {
	getToken,
	removeToken
} from '@/utils/auth'
import code from '@/code/code';

function showMessage(value) {
	return Message({
		showClose: true,
		message: value,
		type: 'error',
		duration: 3500
	});
}

// create an axios instance
const service = axios.create({
	withCredentials: true,
	baseURL: process.env.VUE_APP_SERVER_API, // api 的 base_url
	timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(
	config => {
		// Do something before request is sent
		let test = config.baseURL + '/xxzyapi/file/video/upload';
		let test1 = '/xxzyapi/resource/search/espage';
		if (config.url == test || config.url == test1) {
			config.timeout = 600000;
		}
		if (getToken()) {
			// 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
			config.headers['token'] = getToken();
		}
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
		const res = response.data;
		switch (Number(res.code)) {
			case code.success:
				break;
			case code.land_timeout: //用户登陆超时
				if (getToken()) {
					showMessage(res.code + ":" + "用户登陆超时");
				}
				// store.dispatch("clearLogin")
				removeToken();
				router.push('/login');
				break;
			default:
				break;
		}
		return response.data;
	},
	error => {
		showMessage('服务器响应失败');
		return Promise.reject(error)
	}
)

export default service