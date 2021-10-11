import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue')
      },
      {
        path: '/learn',
        name: 'Learn',
        component: () => import('../views/Learn/Learn.vue')
      },
      {
        path: '/material',
        name: 'Material',
        component: () => import('../views/Material/Material.vue')
      },
      {
        path: '/person',
        name: 'Person',
        component: () => import('../views/Person/Person.vue')
      }
    ]
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('../views/Markdown/Markdown.vue')
  },
  {
    path: '/browser',
    name: 'Browser',
    component: () => import('../views/Browser/Browser.vue')
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
