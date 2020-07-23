import Vue from 'vue'
import Element, { Loading } from 'element-ui'

Vue.prototype.$message = Element.Message
Vue.use(Loading)
Vue.use(Element)
