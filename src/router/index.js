import Vue from 'vue'
import Router from 'vue-router'
import RouterTest from '@/components/RouterTest'
import MainPage from '@/views/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/routertest',
      component: RouterTest,
      props: true
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/MyPage',
      name: 'MyPage',
      component: () => import('../views/MyPage.vue')
    }
  ]
})
