import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { isChrome } from './utils/utils'

// 重置样式
import 'normalize.css/normalize.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入markdown组件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 引入d3
import * as d3 from 'd3'
Vue.prototype.$d3 = d3
window.d3 = d3

// 引入svg
import './icons'

// 引入字体
import './assets/styles/font.scss'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = 'Rousean'
  // 判断是不是桌面端谷歌浏览器访问
  if (to.path === '/browser') {
    next()
  } else {
    if (isChrome()) {
      next()
    } else {
      next({ path: '/browser' })
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
