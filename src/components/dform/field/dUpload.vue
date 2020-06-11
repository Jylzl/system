<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-15 14:27:29
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-15 17:32:07
 -->
<template>
	<div>
		<el-upload
			:action="s_action"
			:multiple="b_multiple"
			:name="s_name"
			:with-credentials="b_withCredentials"
			:show-file-list="b_showFileList && s_listType != 'picture'"
			:drag="b_drag"
			:accept="s_accept"
			:list-type="s_listType"
			:auto-upload="b_autoUpload"
			:limit="i_limit"
			:disabled="b_disabled"
			:on-preview="fn_preview"
			:on-remove="fn_remove"
			:on-success="fn_success"
			:on-error="fn_error"
			:on-progress="fn_progress"
			:on-change="fn_change"
			:on-exceed="fn_exceed"
			:before-upload="fn_beforeUpload"
			:before-remove="fn_beforeRemove"
			:http-request="fu_httpRequest"
			:file-list="fileList"
			:class="{'avatar-uploader':s_listType == 'picture'}"
		>
			<template v-if="s_listType == 'picture'">
				<img v-if="imageUrl" :src="imageUrl" class="avatar" />
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</template>
			<template v-else-if="s_listType == 'picture-card'">
				<i slot="default" class="el-icon-plus"></i>
				<div slot="file" slot-scope="{file}">
					<!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt /> -->
					<el-image class="el-upload-list__item-thumbnail1" :src="file.url" :preview-src-list="srcList"></el-image>
					<span class="el-upload-list__item-actions">
						<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
							<i class="el-icon-zoom-in"></i>
						</span>
						<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
							<i class="el-icon-download"></i>
						</span>
						<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
							<i class="el-icon-delete"></i>
						</span>
					</span>
				</div>
			</template>
			<template v-else>
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传 {{s_accept}} 文件，且不超过 {{i_size}} MB</div>
			</template>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible" width="30%">
			<img width="100%" :src="imageUrl" alt />
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: "d-upload",
	props: {
		action: {
			type: String,
			default: ""
		},
		multiple: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: "file"
		},
		withCredentials: {
			type: Boolean,
			default: false
		},
		showFileList: {
			type: Boolean,
			default: true
		},
		drag: {
			type: Boolean,
			default: false
		},
		accept: {
			type: String,
			default: "*"
		},
		size: {
			type: Number,
			default: 1
		},
		listType: {
			type: String,
			default: "picture-card"
		},
		autoUpload: {
			type: Boolean,
			default: true
		},
		limit: {
			type: Number,
			default: 10
		},
		disabled: {
			type: Boolean,
			default: false
		},
		fileList: {
			type: Array,
			default() {
				return [
					{
						name: "food.jpeg",
						url:
							"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
					},
					{
						name: "food2.jpeg",
						url:
							"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
					}
				];
			}
		}
	},
	data() {
		return {
			s_action: this.action,
			b_multiple: this.multiple,
			s_name: this.name,
			b_withCredentials: this.withCredentials,
			b_showFileList: this.showFileList,
			b_drag: this.drag,
			s_accept: this.accept,
			i_size: this.size,
			s_listType: this.listType,
			b_autoUpload: this.autoUpload,
			i_limit: this.limit,
			b_disabled: this.disabled,
			imageUrl:
				"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
			dialogVisible: false,
			srcList: [
				"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
				"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
			]
		};
	},
	methods: {
		// 点击文件列表中已上传的文件时的钩子
		fn_preview(file) {
			console.log(file);
			this.imageUrl = file.url;
			this.dialogVisible = true;
		},
		// 文件列表移除文件时的钩子
		fn_remove(file, fileList) {},
		// 文件上传成功时的钩子
		fn_success(response, file, fileList) {
			if (this.s_listType == "picture") {
				this.imageUrl = URL.createObjectURL(file.raw);
			}
		},
		// 文件上传失败时的钩子
		fn_error(err, file, fileList) {},
		// 文件上传时的钩子
		fn_progress(event, file, fileList) {},
		// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
		fn_change(file, fileList) {},
		// 文件超出个数限制时的钩子
		fn_exceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 ${this.i_limit} 个文件，本次选择了 ${
					files.length
				} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			);
		},
		// 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
		fn_beforeUpload(file) {
			const isLt = file.size / 1024 / 1024 < this.i_size;
			if (!isLt) {
				this.$message.error(`上传文件大小不能超过 ${this.i_size}MB!`);
			}
			return isLt;
		},
		// 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
		fn_beforeRemove(file, fileList) {
			return this.$confirm(
				`确定移除 ${file.name} 文件, 是否继续？`,
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}
			)
				.then(() => {
					this.$message({
						type: "success",
						message: "移除成功!"
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消移除"
					});
				});
		},
		// 覆盖默认的上传行为，可以自定义上传的实现
		fu_httpRequest() {}
	}
};
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
