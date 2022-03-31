<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <!-- <img v-lazy="image" /> -->
        <img :src="image" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    images: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
