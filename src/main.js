import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import md5 from 'js-md5'

import { Button, NavBar, Form, Field, Toast } from 'vant'

Vue.config.productionTip = false

Vue.use(Button).use(NavBar).use(Form).use(Field).use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5
