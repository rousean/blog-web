<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
  background-color: #f4f5f5;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', Arial;
  letter-spacing: 1px;
}
body {
  width: 100%;
  height: 100%;
}
/* 隐藏滚动条 */
body::-webkit-scrollbar {
  width: 0px;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
