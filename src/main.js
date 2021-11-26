import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式
import 'normalize.css/normalize.css'

// 引入svg
import './icons'

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

// 引入背景
import Particles from 'particles.vue'
Vue.use(Particles)

import { KinesisContainer, KinesisElement } from 'vue-kinesis'

Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)

import VAnimateCss from 'v-animate-css'
Vue.use(VAnimateCss)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
