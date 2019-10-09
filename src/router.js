import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Manage from './views/Manage'
import Addplayer from './views/Addplayer'
// import Login from './views/Login'
import Login from './components/submit/Login'
import AddAdminUser from './views/AdminUser'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path : '/login',
      name : 'login',
      component : Login,
      meta : {isPublic : true}
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/add',
      name: 'add',
      component: Addplayer
    },
    {
      path: '/addadminuser',
      name: 'addadminuser',
      component: AddAdminUser
    },
  
  ]
})

//每次切换路由的时候的操作
// 需要登录权限的，没有登录会自动跳转到/login
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router