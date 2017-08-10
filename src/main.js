import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import Axios from 'axios'
import "./js/rem"  // 引入rem
// import BScroll from 'better-scroll'

window.axios = Axios
// window.BScroll = BScroll
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})
