/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 10:35:02
 */
const iconfontVersion = ['567566_qo5lxgtishg', '667895_v7uduh4zui', '1899140_bao7woahex']
const iconfontUrl = '/cdn/iconfont/font_$key/iconfont.css'

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

/**
 * 动态插入css
 */
function loadStyle(url) {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}