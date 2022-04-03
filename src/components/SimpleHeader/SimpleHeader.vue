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
    }
  },
  methods: {
    onClickLeft() {
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
