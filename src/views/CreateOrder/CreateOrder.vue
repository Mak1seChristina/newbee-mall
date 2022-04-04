<template>
  <div class="create-order">
    <simple-header :navTitle="'生成订单'"></simple-header>
    <div class="address-wrap" @click="goAddress">
      <van-icon name="contact" class="contact" />
      <div class="name">
        <span>{{ address.userName }}</span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">{{ address.provinceName }} {{ address.cityName }} {{ address.regionName }} {{ address.detailAddress }}</div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <goods-item-in-cart v-for="item in cartList" :key="item.cartItemId" :goodInfo="item"></goods-item-in-cart>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ totalPrice }}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block @click="createOrder">生成订单</van-button>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false" closeable position="bottom" :style="{ height: '30%' }" @close="close">
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import GoodsItemInCart from '@/components/GoodsItem/GoodsItemInCart.vue'
import { getByCartItemIds } from '@/api/cartAPI.js'
import { getDefaultAddress, getAddressDetail } from '@/api/addressAPI.js'
import { createOrder, payOrder } from '@/api/orderAPI.js'

export default {
  name: 'CreateOrder',
  components: {
    SimpleHeader,
    GoodsItemInCart
  },
  data() {
    return {
      cartList: [],
      address: {},
      show: false,
      orderNum: ''
    }
  },
  computed: {
    totalPrice() {
      return this.cartList.reduce((sum, item) => sum + item.sellingPrice * item.goodsCount, 0)
    }
  },
  methods: {
    async init() {
      const { addressId, cartItemIds } = this.$route.query
      const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(localStorage.getItem('cartItemIds'))
      localStorage.setItem('cartItemIds', JSON.stringify(_cartItemIds))
      try {
        const { data: cartItemRes } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })
        const { data: addressRes } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
        if (!addressRes.data) {
          this.$router.push({ path: '/address' })
        }
        this.cartList = cartItemRes.data
        this.address = addressRes.data
      } catch (err) {}
    },
    goAddress() {
      this.$router.push({ path: `/address?addressId=${this.address.addressId}` })
    },
    async createOrder() {
      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartList.map(item => item.cartItemId)
      }
      const { data: res } = await createOrder(params)
      if (res.resultCode === 200) {
        // 移除本地存储中的 cartItemIds
        localStorage.setItem('cartItemIds', '')
        this.orderNum = res.data
      }
      this.show = true
    },
    async payOrder(type) {
      const { data: res } = await payOrder({ orderNo: this.orderNum, payType: type })
      if (res.resultCode === 200) {
        this.$router.push({ path: '/order' })
      }
    },
    close() {
      this.$router.push({ path: '/order' })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.create-order {
  background: #f9f9f9;
  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    font-size: 14px;
    padding: 15px;
    padding-left: 40px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .contact {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
      content: '';
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
