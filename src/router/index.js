import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/home',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue')
      },
      {
        path: 'learn',
        name: 'Learn',
        component: () => import('../views/Learn/Learn.vue'),
        children: [
          {
            path: 'note',
            name: 'Note',
            component: () => import('../views/Learn/Note.vue')
          },
        ]
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('../views/Material/Material.vue')
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('../views/Person/Person.vue')
      },

    ]
  },
  {
    path: '/browser',
    name: 'Browser',
    component: () => import('../views/Browser/Browser.vue')
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('../views/Learn/Markdown.vue')
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

export default router
