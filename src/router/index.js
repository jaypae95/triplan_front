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
    },
    {
      path: '/Attraction',
      name: 'Attraction',
      component: () => import('../views/AttractionList.vue')
    },
    {
      path: '/MakePlan',
      name: 'MakePlan',
      component: () => import('../views/MakePlan.vue')
    },
    {
      path: '/SharePlan',
      name: 'SharePlan',
      component: () => import('../views/SharePlan.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    }
  ]
})
