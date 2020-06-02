<!--
 * @Description: 
 * @Author: haoran
 * @Date: 2020-04-30 13:48:12
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-05-08 10:58:57
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url(./assets/css/rest.min.css);
@import url(./assets/css/animate.css);
@import url(./assets/iconfont/iconfont.css);

@media (-webkit-max-device-pixel-ratio: 1) {
  ::-webkit-scrollbar-track-piece {
    background-color: #ffffff;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c2c2c2;
    background-clip: padding-box;
    min-height: 28px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }
}

html,
body,
#app {
  position: relative;
  height: 100%;
  width: 100%;
}

.h100 {
  height: 100%;
}
</style>
