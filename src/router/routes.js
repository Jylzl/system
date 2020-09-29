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
            leaf: true,
            iconCls: "el-icon-data-analysis",
            topPath: '/'
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
                    iconCls: "el-icon-data-analysis",
                    topPath: '/'
                },
                path: '/work',
                name: 'work',
                component: ansycRoutes.get('work')
            }, {
                meta: {
                    title: '个人中心',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-s-custom",
                    topPath: '/'
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
            iconCls: "el-icon-lock",
            topPath: '/power'
        },
        path: '/power',
        name: 'power',
        redirect: '/power/menu',
        component: Container,
        children: [
            {
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-menu",
                    topPath: '/power'
                },
                path: '/power/menu',
                name: 'menu',
                component: ansycRoutes.get('menu')
            }, {
                meta: {
                    title: '区域管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/power'
                },
                path: '/power/area',
                name: 'area',
                component: ansycRoutes.get('area')
            }, {
                meta: {
                    title: '部门管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-s-check",
                    topPath: '/power'
                },
                path: '/power/dept',
                name: 'dept',
                component: ansycRoutes.get('dept')
            }, {
                meta: {
                    title: '角色管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-collection-tag",
                    topPath: '/power'
                },
                path: '/power/roles',
                name: 'roles',
                component: ansycRoutes.get('roles')
            }, {
                meta: {
                    title: '用户管理',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-user",
                    topPath: '/power'
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
            iconCls: "el-icon-odometer",
            topPath: '/monitor'
        },
        path: '/monitor',
        name: 'monitor',
        redirect: '/monitor/baidu',
        component: Container,
        children: [
            {
                meta: {
                    title: '百度统计',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-bangzhu",
                    topPath: '/monitor'
                },
                path: '/monitor/baidu',
                name: 'baidu',
                component: ansycRoutes.get('baidu')
            }, {
                meta: {
                    title: '系统监控',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-monitor",
                    topPath: '/monitor'
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
            iconCls: "el-icon-connection",
            topPath: '/app'
        },
        path: '/app',
        name: 'app',
        redirect: '/app/one',
        component: Container,
        children: [
            {
                meta: {
                    title: 'tinymce富文本',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/one',
                name: 'one',
                component: ansycRoutes.get('one')
            }, {
                meta: {
                    title: 'vscode编辑器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/two',
                name: 'two',
                component: ansycRoutes.get('two')
            }, {
                meta: {
                    title: '动态表单',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    keepAlive: true,
                    topPath: '/app'
                },
                path: '/app/three',
                name: 'three',
                component: ansycRoutes.get('three')
            }, {
                meta: {
                    title: '视频播放',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/four',
                name: 'four',
                component: ansycRoutes.get('four')
            }, {
                meta: {
                    title: '图标选择器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/five',
                name: 'five',
                component: ansycRoutes.get('five')
            }, {
                meta: {
                    title: '拼图验证码',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/six',
                name: 'six',
                component: ansycRoutes.get('six')
            }, {
                meta: {
                    title: 'PDF生成',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/seven',
                name: 'seven',
                component: ansycRoutes.get('seven')
            }, {
                meta: {
                    title: '右键',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/app'
                },
                path: '/app/eight',
                name: 'eight',
                component: ansycRoutes.get('eight')
            }]
    }, {
        meta: {
            title: '特殊页面',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-star-off",
            topPath: '/page'
        },
        path: '/page',
        name: 'page',
        redirect: '/page/content_list',
        component: Container,
        children: [
            {
                meta: {
                    title: '内容列表',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-notebook-2",
                    topPath: '/page'
                },
                path: '/page/content_list',
                name: 'content',
                component: ansycRoutes.get('content'),
            },
            {
                meta: {
                    title: '内容详情',
                    hidden: true,
                    leaf: true,
                    iconCls: "el-icon-notebook-2",
                    topPath: '/page'
                },
                path: '/page/content_details',
                name: 'contentDetails',
                component: ansycRoutes.get('contentDetails')
            },
            {
                meta: {
                    title: '栏目列表',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-notebook-1",
                    topPath: '/page'
                },
                path: '/page/column',
                name: 'column',
                component: ansycRoutes.get('column')
            }
        ]
    }, {
        meta: {
            title: '错误页',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-brush",
            topPath: '/errs'
        },
        path: '/errs',
        name: 'errs',
        component: Container,
        children: [
            {
                meta: {
                    title: '404错误',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/errs'
                },
                path: '/errs/404',
                name: 'errs404',
                component: () => import('@/views/error/404.vue')
            }, {
                meta: {
                    title: '401错误',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/errs'
                },
                path: '/errs/401',
                name: 'errs401',
                component: () => import('@/views/error/401.vue')
            }, {
                meta: {
                    title: '开发中',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place",
                    topPath: '/errs'
                },
                path: '/errs/developing',
                name: 'developing',
                component: () => import('@/views/error/developing.vue')
            }]
    },
    {
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
            title: '401',
            hidden: true,
            open: true,
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
            open: true,
            topPath: '/404'
        },
        path: '/404',
        name: 'err404',
        component: () => import('@/views/error/404.vue')
    },
    {
        meta: {
            title: '404',
            hidden: true,
            topPath: '*'
        },
        path: '*',
        name: 'err404all',
        redirect: '/404',
        component: () => import('@/views/error/404.vue')
    }
]
export { routes, ansycRoutes };