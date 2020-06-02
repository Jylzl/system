/**
 * @description: 对储存在cookies里面的token的设置、获取、删除方法
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-31 17:22:06
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-12 18:18:09
 */

import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token, {
		expires: 3,
		// Domain:'xiaogan.gov.cn',
		path: '/'
	})

	// if (Cookies.get("account")) {
	// 	return Cookies.set(TokenKey, token, {
	// 		expires: 3,
	// 		Domain:'xiaogan.gov.cn',
	// 		path: '/'
	// 	})
	// } else {
	// 	return Cookies.set(TokenKey, token)
	// }
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}