/**
 * @description: 插入百度地图
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-09-17 11:46:15
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-04 17:07:24
 */
tinymce.PluginManager.add('bdmap', function (editor, url) {
	var pluginName = '插入百度地图';
	var baseURL = tinymce.baseURL;
	var iframe1 = baseURL + '/plugins/bdmap/map.html';
	var bdmap_width = function (editor) {
		return editor.getParam('bdmap_width', 560);
	};
	var bdmap_height = function (editor) {
		return editor.getParam('bdmap_height', 362);
	};
	window.tinymceLng = '';
	window.tinymceLat = '';
	var openDialog = function () {
		return editor.windowManager.openUrl({
			title: pluginName,
			size: 'large',
			//width: 800,
			//height: 500,
			url: iframe1,
			buttons: [{
				type: 'cancel',
				text: 'Close'
			},
			{
				type: 'custom',
				text: 'Save',
				name: 'save',
				primary: true
			},
			],
			onAction: function (api, details) {
				switch (details.name) {
					case 'save':
						html = '<iframe src="' + baseURL + '/plugins/bdmap/bd.html?center=' + tinymceLng + '%2C' + tinymceLat + '&zoom=14&width=' + (bdmap_width(editor) - 2) + '&height=' + (bdmap_height(editor) - 2) + '" frameborder="0" style="width:' + bdmap_width(editor) + 'px;height:' + bdmap_height(editor) + 'px; display:block; margin: 0 auto;">';
						editor.insertContent(html);
						api.close();
						break;
					default:
						break;
				}

			}
		});
	};

	editor.ui.registry.addButton('bdmap', {
		//icon: 'preferences',
		text: '<svg t="1568777572164" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7733" width="24" height="24"><path d="M85.333 469.714c0-17.883 14.327-32.38 32-32.38 17.673 0 32 14.497 32 32.38v316.43c0 5.962 4.776 10.795 10.667 10.795 1.759 0 3.49-0.44 5.04-1.282l154.848-84.023a73.901 73.901 0 0 1 72.865 1.297l252.541 148.84a10.557 10.557 0 0 0 10.115 0.34l213.337-107.265c3.627-1.824 5.92-5.568 5.92-9.666V469.714c0-17.883 14.328-32.38 32-32.38 17.674 0 32 14.497 32 32.38V745.18c0 28.686-16.054 54.898-41.441 67.663L683.888 920.108c-22.494 11.31-49.1 10.417-70.804-2.375l-252.541-148.84a10.557 10.557 0 0 0-10.41-0.185L195.286 852.73A73.969 73.969 0 0 1 160 861.7c-41.237 0-74.667-33.828-74.667-75.556v-316.43z m672-132.26c0 87.809-73.165 192.92-217.054 320.282-16.145 14.291-40.415 14.291-56.559 0-143.888-127.363-217.053-232.473-217.053-320.281C266.667 203.97 376.637 96 512 96c135.364 0 245.333 107.97 245.333 241.455z m-426.666 0c0 61.514 59.716 149.556 181.333 259.701 121.617-110.144 181.333-198.186 181.333-259.7C693.333 239.582 612.278 160 512 160c-100.278 0-181.333 79.582-181.333 177.455zM512 405.335c-35.346 0-64-28.654-64-64 0-35.347 28.654-64 64-64 35.346 0 64 28.653 64 64 0 35.346-28.654 64-64 64z" fill="#222f3e" p-id="7734"></path></svg>',
		tooltip: pluginName,
		onAction: function () {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('bdmap', {
		text: pluginName,
		onAction: function () {
			openDialog();
		}
	});
	return {
		getMetadata: function () {
			return {
				name: pluginName,
				url: "http://tinymce.ax-z.cn/more-plugins/bdmap.php",
			};
		}
	};
});