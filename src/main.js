import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import md5 from 'js-md5'

import { prefix } from '@/common/js/utils.js'

import { Button, NavBar, Form, Field, Toast, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Lazyload } from 'vant'

Vue.config.productionTip = false

Vue.use(Button).use(NavBar).use(Form).use(Field).use(Toast).use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5
Vue.prototype.prefix = prefix
