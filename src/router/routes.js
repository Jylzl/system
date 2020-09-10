/*
 * @Description: routes静态路由，ansycRoutes动态路由
 * @Author: haoran
 * @Date: 2020-04-30 14:00:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-17 12:02:02
 */
import {
    ansycRoutes
} from '@/router/ansycRoutes';

import Container from '@/layout/Container.vue';
// import ChildView from '@/layout/ChildView.vue';

import Login from '@/views/account/Login.vue'
import Lock from '@/views/account/Lock.vue'
import Register from '@/views/account/Register.vue'

const routes = [
    {
        meta: {
            title: '欢迎页',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-data-analysis"
        },
        path: '/',
        name: 'Layout',
        redirect: '/work',
        component: Container,
        children: [
            {
                meta: {
                    title: '工作台',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-data-analysis"
                },
                path: '/work',
                name: 'work',
                component: ansycRoutes.get('work')
            }, {
                meta: {
                    title: '个人中心',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-s-custom"
                },
                path: '/personal',
                name: 'personal',
                component: ansycRoutes.get('personal')
            }
        ]
    }, {
        meta: {
            title: '权限管理',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-lock"
        },
        path: '/power',
        name: 'power',
        component: Container,
        children: [
            {
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/power/menu',
                name: 'menu',
                component: ansycRoutes.get('menu')
            }, {
                meta: {
                    title: '区域管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/power/region',
                name: 'region',
                component: ansycRoutes.get('region')
            }, {
                meta: {
                    title: '部门管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-monitor"
                },
                path: '/power/dept',
                name: 'dept',
                component: ansycRoutes.get('dept')
            }, {
                meta: {
                    title: '角色管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-monitor"
                },
                path: '/power/roles',
                name: 'roles',
                component: ansycRoutes.get('roles')
            }, {
                meta: {
                    title: '用户管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-monitor"
                },
                path: '/power/users',
                name: 'users',
                component: ansycRoutes.get('users')
            }
        ]
    }, {
        meta: {
            title: '运维管理',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-odometer"
        },
        path: '/monitor',
        name: 'monitor',
        component: Container,
        children: [
            {
                meta: {
                    title: '百度统计',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/monitor/baidu',
                name: 'baidu',
                component: ansycRoutes.get('baidu')
            }, {
                meta: {
                    title: '系统监控',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/monitor/perf',
                name: 'perf',
                component: ansycRoutes.get('perf')
            }]
    }, {
        meta: {
            title: '应用管理',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-connection"
        },
        path: '/app',
        name: 'app',
        redirect: '/app/three',
        component: Container,
        children: [
            {
                meta: {
                    title: 'tinymce富文本',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/one',
                name: 'one',
                component: ansycRoutes.get('one')
            }, {
                meta: {
                    title: 'vscode编辑器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/two',
                name: 'two',
                component: ansycRoutes.get('two')
            }, {
                meta: {
                    title: '动态表单',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/three',
                name: 'three',
                component: ansycRoutes.get('three')
            }, {
                meta: {
                    title: '视频播放',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/four',
                name: 'four',
                component: ansycRoutes.get('four')
            }, {
                meta: {
                    title: '图标选择器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/five',
                name: 'five',
                component: ansycRoutes.get('five')
            }, {
                meta: {
                    title: '拼图验证码',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/six',
                name: 'six',
                component: ansycRoutes.get('six')
            }, {
                meta: {
                    title: 'PDF生成',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/seven',
                name: 'seven',
                component: ansycRoutes.get('seven')
            }]
    },
    {
        meta: {
            title: '登录',
            hidden: true,
            open: true
        },
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        meta: {
            title: '锁屏',
            hidden: true,
            open: true
        },
        path: '/lock',
        name: 'lock',
        component: Lock
    },
    {
        meta: {
            title: '注册',
            hidden: true,
            open: true
        },
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        meta: {
            title: '401',
            hidden: true,
            open: true
        },
        path: '/401',
        name: 'err401',
        component: () => import('@/views/error/401.vue')
    },
    {
        meta: {
            title: '404',
            hidden: true,
            open: true
        },
        path: '/404',
        name: 'err404',
        component: () => import('@/views/error/404.vue')
    },
    {
        meta: {
            title: '404',
            hidden: true
        },
        path: '*',
        name: 'err404all',
        redirect: '/404',
        component: () => import('@/views/error/404.vue')
    }
]
export { routes, ansycRoutes };