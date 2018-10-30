import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login';
import Form from '@/components/form/Form';
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      hidden:true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      name:"Home",
      component:Home
    }
  ]
})
