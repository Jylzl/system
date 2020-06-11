/**
 * @description: 附件上传
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-09-18 09:23:12
 * @LastAuthor: lizlong
 * @lastTime: 2019-09-18 09:32:41
 */
tinymce.PluginManager.add('enclosure', function (editor, url) {
    var pluginName = '插入附件';
    // var baseURL = tinymce.baseURL;
    var openDialog = function () {
        return editor.windowManager.open({
            title: '附件',
            body: {
                type: 'panel',
                items: [{
                    type: 'input',
                    name: 'title',
                    label: 'Title'
                }]
            },
            buttons: [{
                    type: 'cancel',
                    text: 'Close'
                },
                {
                    type: 'submit',
                    text: 'Save',
                    primary: true
                }
            ],
            onSubmit: function (api) {
                var data = api.getData();
                // 将输入框内容插入到内容区光标位置
                editor.insertContent('插入的文字是: ' + data.title);
                api.close();
            }
        });
    };

    // 注册一个工具栏按钮名称
    editor.ui.registry.addButton('enclosure', {
        text: '<svg t="1568770323430" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="24" height="24"><path d="M729.6 411.2L446.4 694.4c-43.2 43.2-115.2 43.2-158.4 0s-43.2-115.2 0-158.4l334.4-334.4c72-72 188.8-72 260.8 0s72 188.8 0 260.8L524.8 819.2c-99.2 99.2-262.4 99.2-361.6 0s-99.2-262.4 0-361.6l305.6-307.2c3.2-3.2 6.4-4.8 8-8l3.2-3.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8-4.8 3.2-8 6.4-11.2 11.2L208 502.4c-75.2 75.2-75.2 196.8 0 272s196.8 75.2 272 0l305.6-305.6 11.2-11.2 40-40c46.4-46.4 46.4-123.2 0-169.6s-123.2-46.4-169.6 0L332.8 580.8c-19.2 19.2-19.2 49.6 0 67.2 19.2 19.2 49.6 19.2 67.2 0l283.2-283.2c12.8-12.8 32-12.8 44.8 0 12.8 14.4 12.8 33.6 1.6 46.4z" p-id="3354" fill="#222f3e"></path></svg>',
        tooltip: pluginName,
        onAction: function () {
            openDialog();
        }
    });

    // 注册一个菜单项名称 menu/menubar
    editor.ui.registry.addMenuItem('enclosure', {
        text: 'Example菜单名',
        onAction: function () {
            openDialog();
        }
    });

    return {
        getMetadata: function () {
            return {
                //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
                name: "enclosure plugin", //插件名称
                url: "http://exampleplugindocsurl.com", //作者网址
            };
        }
    };
});