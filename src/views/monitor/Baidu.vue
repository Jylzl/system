<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-06-12 14:35:17
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 18:28:23
--> 
<template>
    <div class="baidu-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <iframe @load="iframeLoad" src="https://tongji.baidu.com/web/welcome/ico?s=1d4ec18a7cbce647ca4de2f7f0e3df7e"
            frameborder="0" width="100%" height="100%"></iframe>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true
            };
        },
        methods: {
            iframeLoad() {
                this.loading = false
            }
        }
    };
</script>
<style scoped>
    .baidu-box {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>