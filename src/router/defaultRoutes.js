/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-13 10:40:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-13 11:02:13
 */
/*
 * @Description: routes静态路由，routes动态路由,open开放性路由
 * @Author: haoran
 * @Date: 2020-04-30 14:00:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-17 12:02:02
 */

// import Container from '@/layout/Container.vue';
// import ChildView from '@/layout/ChildView.vue';

import Login from '@/views/account/login/Index.vue'
import Lock from '@/views/account/lock/Index.vue'
import Register from '@/views/account/register/Index.vue'
import Forget from '@/views/account/forget/Index.vue'

const defaultRoute = [{
  meta: {
    title: '登录',
    hidden: true,
    open: true,
    topPath: '/login'
  },
  path: '/login',
  name: 'login',
  component: Login
},
{
  meta: {
    title: '锁屏',
    hidden: true,
    open: true,
    topPath: '/lock'
  },
  path: '/lock',
  name: 'lock',
  component: Lock
},
{
  meta: {
    title: '注册',
    hidden: true,
    open: true,
    topPath: '/register'
  },
  path: '/register',
  name: 'register',
  component: Register
},
{
  meta: {
    title: '找回密码',
    hidden: true,
    open: true,
    topPath: '/forget'
  },
  path: '/forget',
  name: 'forget',
  component: Forget
}];

const errRoute = [{
  meta: {
    title: '401',
    hidden: true,
    leaf: true,
    topPath: '/401'
  },
  path: '/401',
  name: 'err401',
  component: () => import('@/views/error/401.vue')
},
{
  meta: {
    title: '404',
    hidden: true,
    leaf: true,
    topPath: '/404'
  },
  path: '/404',
  name: 'err404',
  component: () => import('@/views/error/404.vue')
}, {
  meta: {
    title: '开发中',
    hidden: true,
    leaf: true,
    topPath: '/302'
  },
  path: '/302',
  name: 'err302',
  component: () => import('@/views/error/developing.vue')
}];

const routesAll = []
export { routesAll, defaultRoute, errRoute };