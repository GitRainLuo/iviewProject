// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Mock from './mock/mock'
import BaiduMap from 'vue-baidu-map'

Mock.bootstrap();
Vue.config.productionTip = false
Vue.use(iView)
//使用百度地图
Vue.use(BaiduMap,{
  ak:"ii84hSvhldboVVvCM8hEhTEQc1W4shUI"
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
