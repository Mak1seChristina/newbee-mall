<template>
  <div class="product-detail">
    <simple-header :navTitle="'商品详情'"></simple-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
            <img :src="prefix(item)" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.goodsName }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice }}</span>
          <!-- <span>库存203</span> -->
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :badge="cartCount" @click="goTo" text="购物车" />
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="goToCart" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getGoodDetail } from '@/api/goodAPI.js'
import { mapActions, mapState } from 'vuex'
import { addCart } from '@/api/cartAPI.js'
import { Toast } from 'vant'

export default {
  name: 'ProductDetail',
  components: {
    SimpleHeader
  },
  data() {
    return {
      detail: {
        goodsCarouselList: []
      }
    }
  },
  computed: {
    ...mapState('cartAbout', ['cartInfo']),
    id() {
      return this.$route.params.id
    },
    cartCount() {
      if (this.cartInfo.length === 0) return ''
      return this.cartInfo.reduce((sum, item) => {
        return sum + item.goodsCount
      }, 0)
    }
  },
  methods: {
    ...mapActions('cartAbout', ['updateCart']),
    async initPageDetail() {
      const { data: res } = await getGoodDetail(this.id)
      if (res.resultCode === 200) {
        this.detail = res.data
      }
      // 初始化购物车的 state
      this.updateCart()
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    async addCart() {
      try {
        const { data: res } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
        if (res.resultCode === 200) {
          Toast.success('添加成功')
          this.updateCart()
        }
      } catch (err) {}
    },
    async goToCart() {
      const goodInCart = this.cartInfo.some(item => {
        return item.goodsId === this.detail.goodsId
      })
      // 如果该商品不在购物车中，则将商品添加进购物车
      if (!goodInCart) {
        try {
          const { data: res } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
          if (res.resultCode === 200) {
            this.updateCart()
          }
        } catch (err) {}
      }
      // 跳转至购物车页面
      this.$router.push({ path: '/cart' })
    }
  },
  created() {
    this.initPageDetail()
  },
  updated() {
    const img = document.querySelector('.product-content img')
    img.style.width = '100%'
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.product-detail {
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>
