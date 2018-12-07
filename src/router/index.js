import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Form from '@/components/form/Form';
import map from '@/components/Map';
import Home from '@/components/Home';
import baiduMap from '@/components/BaiMap/baiduMapVue';
import bdMap from '@/components/BaiMap/bdMap';
import test from  '@/components/Test';
import usersTable from '@/components/Table/usersTable'

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
      component: Login,
      hidden:true
    },
    // {
    //   path:'/home',
    //   name:"Home",
    //   component:Home
    // },
    // {
    //   path:'/map',
    //   name:"Map",
    //   component:map
    // },
    // {
    //   path:'/baiduMapVue',
    //   name:"baiduMapVue",
    //   component:baiduMap
    // },
    // {
    //   path:'/bdMap',
    //   name:"bdMap",
    //   component:bdMap
    // },
    {
      path:'/',
      name:"导航一",
      component:Home,
      iconCls:"ios-map-outline",
      hidden:false,
      children:[
        {
          path:"/map",
          name:"地图1",
          component:map,
          hidden:false
        },
        {
          path:"/baiduMapVue",
          name:"地图2",
          component:baiduMap
        },
        {
          path:"/bdMap",
          name:"自动定位",
          component:bdMap
        },
      ]
    },
    {
      path:"/",
      name:"导航二",
      component:Home,
      iconCls:"ios-mail-outline",
      children:[
        {
          path:"/Test",
          name:"Test",
          component:test
        },
        {
          path:"/usersTable",
          name:"用户列表",
          component:usersTable
        }
      ]
    }
  ]
})
