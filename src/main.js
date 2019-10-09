import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'  
import http from './http'     //自己封装的http模块，做服务器请求用
Vue.prototype.$http = http

const myEvent = new Vue()

Vue.prototype.$myevent = myEvent

//websocket
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'localhost:4000',  //  本地调试
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
