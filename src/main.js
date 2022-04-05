import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import md5 from 'js-md5'

import { prefix } from '@/common/js/utils.js'

import {
  Button,
  NavBar,
  Form,
  Field,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Stepper,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  SubmitBar,
  ContactCard,
  AddressList,
  AddressEdit,
  Popup,
  Tab,
  Tabs,
  Card,
  List,
  PullRefresh,
  Dialog,
  Search,
  Sidebar,
  SidebarItem
} from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Stepper)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SwipeCell)
  .use(SubmitBar)
  .use(ContactCard)
  .use(AddressList)
  .use(AddressEdit)
  .use(Popup)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(List)
  .use(PullRefresh)
  .use(Dialog)
  .use(Search)
  .use(Sidebar)
  .use(SidebarItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5
Vue.prototype.prefix = prefix
