/*
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 14:00:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-17 12:02:02
 */
import {
    ansycRoutes
} from '@/router/ansycRoutes';

import Layout from '@/layout/Container.vue';
import ChildView from '@/layout/ChildView.vue';

import Login from '@/views/account/Login.vue'
import Lock from '@/views/account/Lock.vue'
import Register from '@/views/account/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/work',
        component: Layout,
        children: [{
            meta: {
                title: '工作台',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-data-analysis"
            },
            path: '/work',
            name: 'Work',
            component: () => import('@/views/work/Work.vue')
        }, {
            meta: {
                title: '权限管理',
                hidden: false,
                leaf: false,
                iconCls: "el-icon-lock"
            },
            path: '/power',
            name: 'power',
            component: ChildView,
            children: [
                {
                    meta: {
                        title: '区域管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-place"
                    },
                    path: '/power/region',
                    name: 'Region',
                    component: () => import('@/views/power/Dept.vue')
                }, {
                    meta: {
                        title: '机构管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/power/dept',
                    name: 'Dept',
                    component: () => import('@/views/power/Dept.vue')
                }, {
                    meta: {
                        title: '角色管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/power/roles',
                    name: 'Roles',
                    component: () => import('@/views/power/Roles.vue')
                }, {
                    meta: {
                        title: '用户管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/power/users',
                    name: 'Users',
                    component: () => import('@/views/power/Users.vue')
                }
            ]
        }, {
            meta: {
                title: '应用管理',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-connection"
            },
            path: '/app',
            name: 'App',
            component: () => import('@/views/work/Work.vue')
        },]
    },
    {
        meta: {
            title: '登录',
            hidden: true
        },
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        meta: {
            title: '锁屏',
            hidden: true
        },
        path: '/lock',
        name: 'Lock',
        component: Lock
    },
    {
        meta: {
            title: '注册',
            hidden: true
        },
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        meta: {
            title: '401',
            hidden: true
        },
        path: '/401',
        name: 'err401',
        component: () => import('@/views/error/401.vue')
    },
    {
        meta: {
            title: '404',
            hidden: true
        },
        path: '/404',
        name: 'err404',
        component: () => import('@/views/error/404.vue')
    }
]
export { routes, ansycRoutes };