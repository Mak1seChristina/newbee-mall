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
  }
]

const router = new VueRouter({
  routes
})

export default router
