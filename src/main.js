import Vue from 'vue'

import ElementUI from 'element-ui' // 引用Element-ui
import 'element-ui/lib/theme-chalk/index.css' // 引用Element-ui 主题

import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'

import store from './store'
import Vuex from 'vuex'

import axios from 'axios'
//import '@/components/js/popper.min.js'
//import '@/components/js/bootstrap.min.js'
 //import '@/components/js/plugins.js'
 //import '@/components/js/active.js'
 
//import 'font-awesome/css/font-awesome.min.css'
//import './assets/css/index.css'
//import "./css/style.css";
// import Mock from './mock'
// Mock.bootstrap()

import i18n from './lang' // Internationalization

import './assets/iconfont/iconfont.js'

// axios.defaults.baseURL = 'https://10.9.0.17:80/'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueRouter)
Vue.use(Vuex)

// Vue.use(validateForm)

// NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // NProgress.start();

  // if (to.path === '/login') {
  //   sessionStorage.removeItem('user')
  //   next()
  // }

  // let user = JSON.parse(sessionStorage.getItem('user'))

  // if (!user && to.path !== '/login') {
  //   next({path: '/login'})
  //   return false
  //   // next()
  // } else if (to.path !== '/ports' && store.state.app.adaptiveCode === 500) {
  //   // 验证是否已完成自适应操作
  //   console.log('def ' + store.state.app.adaptiveCode)
  //   next({path: '/ports'})
  // } else {
  //   next()
  // }

  next()
})

// 设置一些全局函数
Vue.prototype.header = function () {
  return {
    'background-color': '#626c91',
    'color': 'white',
    'font-weight': 'normal',
    'padding': '3px'
  }
}

// router.afterEach(transition => {
// NProgress.done();
// });

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  i18n,
  // components: { App }
  render: h => h(App)
}).$mount('#app')

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  let status = error.response.status

  // 统一处理
  switch (status) {
    case 300:
      console.log('300错误')
      break
    case 400:
      console.log('400错误')
      break
    case 401:
      console.log('401错误')
      router.push('/login')
      break
    case 500:
      console.log('500错误')
      break
  }

  // 返回后给每个请求catch抓住针对错误做处理
  return Promise.reject(error)
})
