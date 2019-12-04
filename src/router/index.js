import Vue from 'vue'
import Router from 'vue-router'
import RouterTest from '@/components/RouterTest'
import MainPage from '@/views/MainPage'
import Login from '@/views/LogIn'
import MyPage from '@/views/MyPage'
import AttractionList from '../views/AttractionList'
import MakePlan from '@/views/MakePlan'
import SharePlan from '@/views/SharePlan'
import SignUp from '@/views/SignUp'
import ConfirmPlan from '@/views/ConfirmPlan'
import store from '@/store/index'

Vue.use(Router)

let router = new Router({
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
      path: '/login',
      name: 'LogIn',
      component: Login
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/attractionlist',
      name: 'AttractionList',
      component: AttractionList
    },
    {
      path: '/makeplan',
      name: 'MakePlan',
      component: MakePlan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shareplan',
      name: 'SharePlan',
      component: SharePlan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/confirmplan',
      name: 'ConfirmPlan',
      component: ConfirmPlan,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token === undefined) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
