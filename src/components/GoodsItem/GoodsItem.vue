<template>
  <div class="good-item" @click="goToDetail">
    <img :src="prefix(goodInfo.goodsCoverImg)" alt="" />
    <div class="good-desc">
      <div class="title">{{ goodInfo.goodsName }}</div>
      <div class="price">¥ {{ goodInfo.sellingPrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodItem',
  props: {
    goodInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    goToDetail() {
      this.$router.push({ path: `/product/${this.goodInfo.goodsId}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.good {
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
