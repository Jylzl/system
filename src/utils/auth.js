/**
 * @description: 对储存在cookies里面的token的设置、获取、删除方法
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-31 17:22:06
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 16:53:03
 */

import Cookies from 'js-cookie'

const TokenKey = 'token'
const _csrfToken = 'csrfToken'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function csrfToken() {
	return Cookies.get(_csrfToken)
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