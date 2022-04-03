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
      <div class="good-item" v-for="item in cartList" :key="item.cartItemId">
        <div class="good-img">
          <img :src="item.goodsCoverImg" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>×{{ item.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ totalPrice }}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block>生成订单</van-button>
    </div>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getByCartItemIds } from '@/api/cartAPI.js'
import { getDefaultAddress, getAddressDetail } from '@/api/addressAPI.js'

export default {
  name: 'CreateOrder',
  components: {
    SimpleHeader
  },
  data() {
    return {
      cartList: [],
      address: []
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
