<template>
  <div>
    <router-view></router-view>

    <van-tabbar v-model="active" active-color="rgb(27, 174, 174)" route placeholder>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="points">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped></style>
