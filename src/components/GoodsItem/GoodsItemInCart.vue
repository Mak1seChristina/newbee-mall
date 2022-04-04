<template>
  <div class="good-item">
    <div class="good-img">
      <img :src="goodInfo.goodsCoverImg" alt="" />
    </div>
    <div class="good-desc">
      <div class="good-title">
        <span>{{ goodInfo.goodsName }}</span>
        <span>×{{ goodInfo.goodsCount }}</span>
      </div>
      <div class="good-btn">
        <div class="price">¥{{ goodInfo.sellingPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItemInCart',
  props: {
    goodInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.good-item {
  padding: 10px;
  background: #fff;
  display: flex;
  .good-img {
    img {
      .wh(100px, 100px);
    }
  }
  .good-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    padding: 20px;
    .good-title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
    .good-btn {
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 16px;
        color: red;
        line-height: 28px;
      }
      .van-icon-delete {
        font-size: 20px;
        margin-top: 4px;
      }
    }
  }
}
</style>
