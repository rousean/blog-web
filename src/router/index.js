import Vue from 'vue'
import VueRouter from 'vue-router'
import { isChrome } from '@/utils'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/learn',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: 'learn',
        name: 'Learn',
        component: () => import('../views/Learn/Learn.vue'),
        meta: {
          title: '随笔',
          keepAlive: true
        }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('../views/Material/Material.vue'),
        meta: {
          title: '素材',
          keepAlive: true
        }
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('../views/Person/Person.vue'),
        meta: {
          title: '关于',
          keepAlive: true
        }
      },
      {
        path: 'note',
        name: 'Note',
        component: () => import('../views/Learn/Note.vue'),
        meta: {
          title: '素材',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/browser',
    name: 'Browser',
    component: () => import('../views/Browser/Browser.vue'),
    meta: {
      title: '谷歌',
      keepAlive: false
    }
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('../views/Learn/Markdown.vue'),
    meta: {
      title: 'markdown',
      keepAlive: false
    }
  },

  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'Rousean'
  // 判断是不是桌面端谷歌浏览器访问
  // if (to.path === '/browser') {
  //   next()
  // } else {
  //   if (isChrome()) {
  //     console.log(isChrome())
  //     next()
  //   } else {
  //     next({ path: '/browser' })
  //   }
  // }
  next()
})

export default router
