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
  }
]

const router = new VueRouter({
  routes
})

export default router
