import Vue from 'vue'

import ElementUI from 'element-ui'                            //引用Element-ui
import 'element-ui/lib/theme-chalk/index.css'                 //引用Element-ui 主题

import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'

import store from './store'
import Vuex from 'vuex'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.min.css'
// import Mock from './mock'
// Mock.bootstrap();

import i18n from './lang' // Internationalization

import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfont/iconfont.js'

// import validateForm from '@/utils/validate'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueRouter)
Vue.use(Vuex)

// Vue.use(validateForm)

//NProgress.configure({ showSpinner: false });



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  
  // if (!user && to.path != '/login') {
  //   if(!user && to.path === '/createPasswd')
  //   {
  //     next()
  //   }
  //   else {
  //       next({path: '/login'})
  //   }
  // } else {
  //   next()
  // }

  if (!user && to.path != '/login') {
    // 搞完记得恢复
    next({path: '/login'})
  }
  else{
    next()
  }
  next()
})

//设置一些全局函数
Vue.prototype.header = function (){
  return {
    'background-color': '#626c91',
    'color': 'white',
    'font-weight': 'normal',
    'padding':'3px',
  }
}

Vue.prototype.validate 

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  i18n,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

