import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './theme/index.css'
import Avatar from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import VueParticles from 'vue-particles'
import hljs from 'highlight.js'
Vue.directive('highlight', {
  componentUpdated: function (el) {
    const blocks = el.querySelectorAll('pre code')
    for (let i = 0; i < blocks.length; i++) {
      const item = blocks[i]
      hljs.highlightBlock(item)
    };
  }
})
Vue.use(mavonEditor)
Vue.use(VueParticles)
Vue.use(Avatar)
axios.defaults.baseURL = 'http://www.hhhbin.com:8888/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
