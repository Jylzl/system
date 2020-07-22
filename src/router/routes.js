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

import Container from '@/layout/Container.vue';
import ChildView from '@/layout/ChildView.vue';

import Login from '@/views/account/Login.vue'
import Lock from '@/views/account/Lock.vue'
import Register from '@/views/account/Register.vue'

const routes = [
    {
        meta: {
            title: '欢迎页',
            hidden: false
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
                name: 'Work',
                component: () => import('@/views/work/Work.vue')
            }, {
                meta: {
                    title: '个人中心',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-s-custom"
                },
                path: '/personal',
                name: 'Personal',
                component: () => import('@/views/work/Personal.vue')
            }, {
                meta: {
                    title: 'tinymce富文本',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/one',
                name: 'AppOne',
                component: () => import('@/views/app/AppOne.vue')
            }, {
                meta: {
                    title: 'vscode编辑器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/two',
                name: 'AppTwo',
                component: () => import('@/views/app/AppTwo.vue')
            }, {
                meta: {
                    title: '动态表单',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/three',
                name: 'AppThree',
                component: () => import('@/views/app/AppThree.vue')
            }, {
                meta: {
                    title: '百度统计',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/four',
                name: 'AppFour',
                component: () => import('@/views/app/AppFour.vue')
            }, {
                meta: {
                    title: '图标选择器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/five',
                name: 'AppFive',
                component: () => import('@/views/app/AppFive.vue')
            }, {
                meta: {
                    title: '验证码',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/six',
                name: 'AppSix',
                component: () => import('@/views/app/AppSix.vue')
            }
        ]
    },
    {
        meta: {
            title: '系统管理',
            hidden: false
        },
        path: '/system',
        name: 'System',
        redirect: '/system/power',
        component: Container,
        children: [{
            meta: {
                title: '权限管理',
                hidden: false,
                leaf: false,
                iconCls: "el-icon-lock"
            },
            path: '/system/power',
            name: 'power',
            component: ChildView,
            children: [
                {
                    meta: {
                        title: '菜单管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-place"
                    },
                    path: '/system/power/menu',
                    name: 'Menu',
                    component: () => import('@/views/power/Menu.vue')
                }, {
                    meta: {
                        title: '区域管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-place"
                    },
                    path: '/system/power/region',
                    name: 'Region',
                    component: () => import('@/views/power/Dept.vue')
                }, {
                    meta: {
                        title: '机构管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/system/power/dept',
                    name: 'Dept',
                    component: () => import('@/views/power/Dept.vue')
                }, {
                    meta: {
                        title: '角色管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/system/power/roles',
                    name: 'Roles',
                    component: () => import('@/views/power/Roles.vue')
                }, {
                    meta: {
                        title: '用户管理',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-monitor"
                    },
                    path: '/system/power/users',
                    name: 'Users',
                    component: () => import('@/views/power/Users.vue')
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
            name: 'Monitor',
            component: Container,
            children: [
                {
                    meta: {
                        title: '百度统计',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-place"
                    },
                    path: '/app/one1',
                    name: 'AppOne1',
                    component: () => import('@/views/app/AppOne.vue')
                }, {
                    meta: {
                        title: '系统监控',
                        hidden: false,
                        leaf: true,
                        iconCls: "el-icon-place"
                    },
                    path: '/app/two1',
                    name: 'AppTwo1',
                    component: () => import('@/views/app/AppTwo.vue')
                }]
        }]
    }, {
        meta: {
            title: '应用管理',
            hidden: false,
            leaf: false,
            iconCls: "el-icon-connection"
        },
        path: '/app',
        name: 'App',
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
                name: 'AppOne',
                component: () => import('@/views/app/AppOne.vue')
            }, {
                meta: {
                    title: 'vscode编辑器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/two',
                name: 'AppTwo',
                component: () => import('@/views/app/AppTwo.vue')
            }, {
                meta: {
                    title: '动态表单',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/three',
                name: 'AppThree',
                component: () => import('@/views/app/AppThree.vue')
            }, {
                meta: {
                    title: '百度统计',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/four',
                name: 'AppFour',
                component: () => import('@/views/app/AppFour.vue')
            }, {
                meta: {
                    title: '图标选择器',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-place"
                },
                path: '/app/five',
                name: 'AppFive',
                component: () => import('@/views/app/AppFive.vue')
            }]
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