import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入svg
import './icons'

// 重置样式
import 'normalize.css/normalize.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入d3
import * as d3 from 'd3'
Vue.prototype.$d3 = d3
window.d3 = d3

// 引入路由组件动画
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)

// 引入动画组件
import VAnimateCss from 'v-animate-css'
Vue.use(VAnimateCss)

import Particles from 'particles.vue'
Vue.use(Particles)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
