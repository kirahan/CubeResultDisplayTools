import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Manage from './views/Manage'
import Addplayer from './views/Addplayer'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
  ]
})
