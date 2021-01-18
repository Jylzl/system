/**
 * @description: 页面组件声明，需要异步
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-05-21 01:44:44
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 16:48:10
 */

import {
    routes
} from '@/router/routes';

import Container from '@/layout/Container.vue';
import ChildView from '@/layout/ChildView.vue';

const ansycRoute = [{
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
            component: routes.get('work')
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
            component: routes.get('personal')
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
            component: routes.get('menu')
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
            component: routes.get('area')
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
            component: routes.get('dept')
        }, {
            meta: {
                title: '角色管理',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-collection-tag",
                topPath: '/power'
            },
            path: '/power/role',
            name: 'role',
            component: routes.get('role')
        }, {
            meta: {
                title: '用户管理',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-user",
                topPath: '/power'
            },
            path: '/power/user',
            name: 'user',
            component: routes.get('user')
        }
    ]
}, {
    meta: {
        title: '系统管理',
        hidden: false,
        leaf: false,
        iconCls: "el-icon-odometer",
        topPath: '/system'
    },
    path: '/system',
    name: 'system',
    redirect: '/system/dict',
    component: Container,
    children: [{
        meta: {
            title: '字典管理',
            hidden: false,
            leaf: true,
            iconCls: "el-icon-bangzhu",
            topPath: '/system'
        },
        path: '/system/dict',
        name: 'dict',
        component: routes.get('dict')
    }, {
        meta: {
            title: '文件管理',
            hidden: false,
            leaf: true,
            iconCls: "el-icon-files",
            topPath: '/system'
        },
        path: '/system/file',
        name: 'file',
        component: routes.get('file')
    }, {
        meta: {
            title: '密钥管理',
            hidden: false,
            leaf: true,
            iconCls: "el-icon-key",
            topPath: '/system'
        },
        path: '/system/secretkey',
        name: 'secretkey',
        component: routes.get('secretkey')
    }, {
        meta: {
            title: '日志管理',
            hidden: false,
            leaf: true,
            iconCls: "el-icon-tickets",
            topPath: '/system'
        },
        path: '/system/log',
        name: 'log',
        component: routes.get('log')
    }]
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
            component: routes.get('baidu')
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
            component: routes.get('perf')
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
            component: routes.get('one')
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
            component: routes.get('two')
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
            component: routes.get('three')
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
            component: routes.get('four')
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
            component: routes.get('five')
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
            component: routes.get('six')
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
            component: routes.get('seven')
        }, {
            meta: {
                title: '右键菜单',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-place",
                topPath: '/app'
            },
            path: '/app/eight',
            name: 'eight',
            component: routes.get('eight')
        }, {
            meta: {
                title: '邮件管理',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-message",
                topPath: '/app'
            },
            path: '/app/nine',
            name: 'nine',
            component: routes.get('nine')
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
            name: 'contentList',
            component: routes.get('contentList'),
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
            component: routes.get('contentDetails')
        },
        {
            meta: {
                title: '栏目列表',
                hidden: false,
                leaf: true,
                iconCls: "el-icon-notebook-1",
                topPath: '/page'
            },
            path: '/page/column_list',
            name: 'columnList',
            component: routes.get('columnList')
        },
        {
            meta: {
                title: '采集列表',
                hidden: false,
                leaf: false,
                iconCls: "el-icon-cpu",
                topPath: '/page'
            },
            path: '/page/crawler',
            name: 'crawler',
            component: ChildView,
            children: [{
                meta: {
                    title: '站点配置',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-cpu",
                    topPath: '/page'
                },
                path: '/page/crawler/site',
                name: 'crawlerSite',
                component: routes.get('crawlerSite'),
            }, {
                meta: {
                    title: '栏目配置',
                    hidden: false,
                    leaf: true,
                    iconCls: "el-icon-cpu",
                    topPath: '/page'
                },
                path: '/page/crawler/column',
                name: 'crawlerColumn',
                component: routes.get('crawlerColumn'),
            }]
        }
    ]
}];

export { ansycRoute };