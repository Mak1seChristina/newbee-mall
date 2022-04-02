<template>
  <div class="cart-box">
    <simple-header :navTitle="'购物车'"></simple-header>
    <div class="cart-body">
      <van-checkbox-group v-model="result" ref="checkboxGroup" @change="groupChange">
        <van-swipe-cell :right-width="50" v-for="item in cartInfo" :key="item.cartItemId">
          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />
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
                <van-stepper integer min="1" :value="item.goodsCount" :name="item.cartItemId" async-change @change="onChange" />
              </div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" icon="delete" class="delete-button" @click="deleteGood(item.cartItemId)" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar class="submit-all" :price="totalPrice * 100" button-text="结算" @submit="onSubmit" v-if="cartInfo.length > 0">
      <van-checkbox v-model="checkAll" @click="allCheck">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="cartInfo.length === 0">
      <van-icon name="smile-o" />
      <div class="title">购物车空空如也</div>
      <van-button color="#1baeae" type="primary" @click="goTo" block>前往首页</van-button>
    </div>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { mapState, mapActions } from 'vuex'
import { modifyCart, deleteCartItem } from '@/api/cartAPI.js'
import { Toast } from 'vant'

export default {
  name: 'Cart',
  components: {
    SimpleHeader
  },
  data() {
    return {
      checkAll: true,
      result: []
    }
  },
  computed: {
    ...mapState('cartAbout', ['cartInfo']),
    totalPrice() {
      if (this.cartInfo.length > 0) {
        return this.cartInfo
          .filter(item => this.result.indexOf(item.cartItemId) !== -1)
          .reduce((sum, item) => {
            return sum + item.goodsCount * item.sellingPrice
          }, 0)
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions('cartAbout', ['updateCart']),
    async initCart() {
      await this.updateCart()
      // 将复选框中的 name 存入 result
      if (this.cartInfo.length !== 0) {
        this.result = this.cartInfo.map(item => item.cartItemId)
      }
    },
    groupChange(result) {
      if (result.length === this.cartInfo.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.result = result
      this.emitCartItem()
    },
    allCheck() {
      if (this.checkAll) {
        this.result = this.cartInfo.map(item => item.cartItemId)
        // this.result = this.cartItemIdArr
      } else {
        this.result = []
      }
      this.emitCartItem()
    },
    async onChange(value, detail) {
      if (this.cartInfo.filter(item => item.cartItemId === detail.name)[0].goodsCount === value) return
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      }
      try {
        const { data: res } = await modifyCart(params)
        if (res.resultCode === 200) {
          await this.updateCart()
        }
      } catch (err) {}
    },
    async deleteGood(id) {
      const { data: res } = await deleteCartItem(id)
      if (res.resultCode === 200) {
        this.initCart()
      }
    },
    goTo() {
      this.$router.push({ path: '/' })
    },
    onSubmit() {
      if (this.result.length === 0) {
        Toast.fail('请选择商品进行结算')
        return
      }
      const params = JSON.stringify(this.result)
      this.$router.push({ path: `/create-order?cartItemIds=${params}` })
    },
    emitCartItem() {
      this.$emit('getCartItem', this.result)
    }
  },
  created() {
    this.initCart()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';
.cart-box {
  .cart-header {
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
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    margin-bottom: 50px;
    padding-left: 10px;
    .good-item {
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
