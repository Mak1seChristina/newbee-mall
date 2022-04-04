<template>
  <div class="order-box">
    <simple-header :navTitle="'我的订单'" :back="'/user'"></simple-header>
    <van-tabs class="order-tab" v-model="status" @change="onChange">
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="order-list-refresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="order-item-box" v-for="item in orderList" :key="item.orderId" @click="goDetail(item.orderNo)">
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <van-card v-for="good in item.newBeeMallOrderItemVOS" :key="good.goodsId" :num="good.goodsCount" :price="good.sellingPrice" desc="全场包邮" :title="good.goodsName" :thumb="good.goodsCoverImg" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getOrderList } from '@/api/orderAPI.js'

export default {
  name: 'Order',
  components: {
    SimpleHeader
  },
  data() {
    return {
      status: '',
      // 是否正在进行上拉加载
      loading: false,
      // 数据是否加载完成
      finished: false,
      // 是否正在进行下拉刷新
      isLoading: false,
      orderList: [],
      page: 1
    }
  },
  methods: {
    async initOrderList(isRefresh) {
      const params = {
        pageNumber: this.page,
        status: this.status
      }
      const { data: res } = await getOrderList(params)
      if (res.message === 'SUCCESS') {
        this.orderList = [...this.orderList, ...res.data.list]
        // 如果是下拉刷新
        if (isRefresh) {
          // 新数据在前，旧数据在后
          // this.orderList = [...res.data.list, ...this.orderList]
          this.isLoading = false
        } else {
          // 上拉加载，新数据在后，旧数据在前
          // this.orderList = [...this.orderList, ...res.data.list]
          // this.loading = false
        }
        this.$nextTick(() => {
          this.loading = false
        })

        if (this.page >= res.data.totalPage) this.finished = true
        !this.finished && this.page++
      }
    },
    onLoad() {
      !this.isLoading && !this.finished && this.initOrderList()
    },
    onRefresh() {
      this.initOrderList(true)
    },
    onChange(name) {
      this.page = 1
      this.finished = false
      this.isLoading = true
      this.orderList = []
      this.onRefresh()
    },
    goDetail(id) {
      this.$router.push({ path: `/order-detail?id=${id}` })
    }
  },
  created() {
    // this.initOrderList()
    // this.onLoad()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.order-box {
  .order-tab {
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  .order-list-refresh {
    margin-top: 44px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px;
      margin-top: 0;
      background-color: #fff;
      .order-item-header {
        font-size: 12px;
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}

/* .order-box {
  background: #f9f9f9;
  .order-item-box {
    margin: 20px 10px;
    margin-top: 0;
    background-color: #fff;
    .order-item-header {
      font-size: 12px;
      padding: 10px 20px 0 20px;
      display: flex;
      justify-content: space-between;
    }
    .van-card {
      background-color: #fff;
      margin-top: 0;
    }
  }
} */
</style>
