import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Form from '@/components/form/Form';
import map from '@/components/Map';
import Home from '@/components/Home';
import baiduMap from '@/components/BaiMap/baiduMapVue';
import bdMap from '@/components/BaiMap/bdMap';

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
    },
    {
      path:'/map',
      name:"Map",
      component:map
    },
    {
      path:'/baiduMapVue',
      name:"baiduMapVue",
      component:baiduMap
    },
    {
      path:'/bdMap',
      name:"bdMap",
      component:bdMap
    }
  ]
})
