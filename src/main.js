import Vue from 'vue'
// import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
// createApp(App).mount('#app')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
