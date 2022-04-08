<template>
  <div>
    <van-nav-bar :title="navTitle" left-arrow @click-left="onClickLeft" fixed placeholder />
  </div>
</template>

<script>
export default {
  name: 'SimpleHeader',
  props: {
    navTitle: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickLeft() {
      if (this.keyword) {
        this.$router.push({ path: `/product-list?from=category&keyword=${this.keyword}` })
        return
      }
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
