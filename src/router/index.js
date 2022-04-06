import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Home/Home.vue'
import Category from '@/views/Category/Category.vue'
import Cart from '@/views/Cart/Cart.vue'
import User from '@/views/User/User.vue'
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue'
import CreateOrder from '@/views/CreateOrder/CreateOrder.vue'
import Address from '@/views/Address/Address.vue'
import AddressEdit from '@/views/AddressEdit/AddressEdit.vue'
import Order from '@/views/Order/Order.vue'
import OrderDetail from '@/views/OrderDetail/OrderDetail.vue'
import ProductList from '@/views/ProductList/ProductList.vue'
import UserSetting from '@/views/UserSetting/UserSetting.vue'

import store from '@/store/index.js'

// 解决 vue-router 报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Main,
    alias: '/home',
    children: [
      { path: '/', component: Home, name: 'home' },
      { path: '/category', component: Category, name: 'category' },
      { path: '/cart', component: Cart, name: 'cart' },
      { path: '/user', component: User, name: 'user' }
    ]
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    name: 'product-detail'
  },
  {
    path: '/create-order',
    component: CreateOrder,
    name: 'create-order'
  },
  {
    path: '/address',
    component: Address,
    name: 'address'
  },
  {
    path: '/address-edit',
    component: AddressEdit,
    name: 'address-edit'
  },
  {
    path: '/order',
    component: Order,
    name: 'order'
  },
  {
    path: '/order-detail',
    component: OrderDetail,
    name: 'order-detail'
  },
  {
    path: '/product-list',
    component: ProductList,
    name: 'product-list'
  },
  {
    path: '/user-setting',
    component: UserSetting,
    name: 'user-setting'
  }
]

const router = new VueRouter({
  routes
})

const pathArr = ['/', '/home', '/category', '/login']
// 全局前置守卫，路由验证
router.beforeEach((to, from, next) => {
  if (pathArr.indexOf(to.path) !== -1) {
    // 访问无权限页面
    next()
  } else {
    // 访问有权限页面
    const token = store.state.userAbout.token
    if (token) {
      next()
    } else {
      // 记录跳转未遂的路径，以便登录后直接跳转至该路径
      next(`/login?pre=${to.fullPath}`)
    }
  }
})

export default router
