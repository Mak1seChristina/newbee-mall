<template>
  <div class="order-detail-box">
    <simple-header :navTitle="'订单详情'"></simple-header>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ orderDetail.orderStatusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ orderDetail.orderNo }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ orderDetail.createTime }}</span>
      </div>
      <van-button v-if="[1, 2, 3].includes(orderDetail.orderStatus)" style="margin-bottom: 10px" color="#1baeae" block @click="handleConfirmOrder">确认收货</van-button>
      <van-button v-if="orderDetail.orderStatus === 0" style="margin-bottom: 10px" color="#1baeae" block @click="showPay">去支付</van-button>
      <van-button v-if="!(orderDetail.orderStatus === 4 || orderDetail.orderStatus < 0)" block @click="cancelOrder">取消订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥{{ orderDetail.totalPrice }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card style="background: #fff" v-for="item in orderDetail.newBeeMallOrderItemVOS" :key="item.goodsId" :num="item.goodsCount" :price="item.sellingPrice" desc="全场包邮" :title="item.goodsName" :thumb="item.goodsCoverImg" />
    <van-popup v-model="show" position="bottom" :style="{ height: '24%' }">
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getOrderDetail, payOrder, confirmOrder, cancelOrder } from '@/api/orderAPI.js'
import { Dialog, Toast } from 'vant'

export default {
  name: 'OrderDetail',
  components: {
    SimpleHeader
  },
  data() {
    return {
      orderDetail: {},
      show: false
    }
  },
  methods: {
    async initOrderDetail() {
      const id = this.$route.query.id
      const { data: res } = await getOrderDetail(id)
      if (res.message === 'SUCCESS') {
        this.orderDetail = res.data
      }
    },
    showPay() {
      this.show = true
    },
    async payOrder(type) {
      const params = {
        orderNo: this.orderDetail.orderNo,
        payType: type
      }
      const { data: res } = await payOrder(params)
      if (res.message === 'SUCCESS') {
        this.show = false
        this.initOrderDetail()
      }
    },
    handleConfirmOrder() {
      const id = this.orderDetail.orderNo
      Dialog.confirm({
        message: '是否确认收货？',
        confirmButtonColor: '#1baeae'
      })
        .then(async() => {
          const { data: res } = await confirmOrder(id)
          if (res.message === 'SUCCESS') {
            await setTimeout(() => {
              Toast.success('确认成功')
            }, 1000)
            this.initOrderDetail()
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelOrder() {
      const id = this.orderDetail.orderNo
      Dialog.confirm({
        message: '确认取消订单？',
        confirmButtonColor: '#1baeae'
      })
        .then(async() => {
          const { data: res } = await cancelOrder(id)
          if (res.message === 'SUCCESS') {
            await setTimeout(() => {
              Toast.success('删除成功')
            }, 1000)
            this.initOrderDetail()
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  created() {
    this.initOrderDetail()
  }
}
</script>

<style lang="less" scoped>
.order-detail-box {
  height: 100vh;
  background: #f7f7f7;
  .order-status {
    background: #fff;
    padding: 20px;
    font-size: 15px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
