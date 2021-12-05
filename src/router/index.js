import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/r'
  },
  {
    path: '/r',
    name: 'R',
    redirect: '/r/learn',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: 'learn',
        name: 'Learn',
        component: () => import('@/views/Learn'),
        meta: {
          title: '随笔',
          keepAlive: true
        }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('@/views/Material'),
        meta: {
          title: '素材',
          keepAlive: true
        }
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/Person'),
        meta: {
          title: '关于',
          keepAlive: true
        }
      },
      {
        path: 'note',
        name: 'Note',
        component: () => import('@/views/Learn/Note.vue'),
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
    component: () => import('../views/Browser'),
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
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
