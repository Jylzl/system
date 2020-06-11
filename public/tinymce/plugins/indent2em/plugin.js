/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-09-17 11:46:15
 * @LastAuthor: lizlong
 * @lastTime: 2019-09-18 16:57:48
 */
tinymce.PluginManager.add('indent2em', function (editor, url) {
    var pluginName = '首行缩进';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var indent2em_val = editor.getParam('indent2em_val', '2em');
    var doAct = function () {
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        var act = '';
        global$1.each(blocks, function (block) {
            if (act == '') {
                act = dom.getStyle(block, 'text-indent') == indent2em_val ? 'remove' : 'add';
            }
            if (act == 'add') {
                dom.setStyle(block, 'text-indent', indent2em_val);
            } else {
                var style = dom.getAttrib(block, 'style');
                style = style.replace(/text-indent:[\s]*2em;/ig, '');
                dom.setAttrib(block, 'style', style);
            }

        });
    };

    editor.ui.registry.addButton('indent2em', {
        text: '<svg width="24" height="24"><path d="M5.6,13H18.5c0.6,0,1.1,0.4,1.1,1s-0.4,1-1.1,1H5.6C5,15,4.5,14.6,4.5,14S5,13,5.6,13z"/><path d="M11.9,9h6.6c0.6,0,0.9,0.4,0.9,1S19,11,18.5,11H11.9C11.4,11,11,10.6,11,10S11.4,9,11.9,9z"/><path d="M11.9,5h6.6c0.6,0,0.9,0.4,0.9,1S19,7,18.5,7H11.9C11.4,7,11,6.6,11,6S11.4,5,11.9,5z"/><path d="M5.6,17H18.5c0.6,0,1.1,0.4,1.1,1s-0.5,1-1.1,1H5.6C5,19,4.5,18.6,4.5,18S5,17,5.6,17z"/><path d="M4.9,9.2L6.7,8,4.9,6.8C4.5,6.5,4.4,5.8,4.7,5.4S5.7,4.9,6.1,5.2l3,2c0.4,0.3,0.5,1,0.2,1.4l-3,2C5.7,11.1,5,11,4.7,10.6S4.5,9.5,4.9,9.2c0,0,0,0,0,0z"/></svg>',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        }
    });

    editor.ui.registry.addMenuItem('indent2em', {
        text: pluginName,
        onAction: function () {
            doAct();
        }
    });

    return {
        getMetadata: function () {
            return {
                name: pluginName,
                url: "http://tinymce.ax-z.cn/more-plugins/indent2em.php",
            };
        }
    };
});