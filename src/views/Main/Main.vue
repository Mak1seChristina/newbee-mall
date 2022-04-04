<template>
  <div>
    <router-view @getCartItem="cartFilter"></router-view>

    <van-tabbar v-model="active" active-color="rgb(27, 174, 174)" route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="points">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o" :badge="cartCount">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      active: 0,
      cartArr: []
    }
  },
  computed: {
    ...mapState('cartAbout', ['cartInfo']),
    cartCount() {
      // 如果 cartInfo 是一个空数组，则直接返回空字符串
      if (this.cartInfo.length === 0) return ''
      if (this.cartArr) {
        return this.cartInfo
          .filter(item => this.cartArr.indexOf(item.cartItemId) !== -1)
          .reduce((sum, item) => {
            return sum + item.goodsCount
          }, 0)
      }
      return this.cartInfo.reduce((sum, item) => {
        return sum + item.goodsCount
      }, 0)
    }
  },
  methods: {
    ...mapActions('cartAbout', ['updateCart']),
    cartFilter(value) {
      this.cartArr = value
    }
  },
  created() {
    this.cartFilter()
    this.updateCart()
  }
}
</script>

<style lang="less" scoped></style>
