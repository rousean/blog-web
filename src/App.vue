<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
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
