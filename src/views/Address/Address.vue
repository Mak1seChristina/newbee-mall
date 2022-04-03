<template>
  <div class="address-box">
    <simple-header :navTitle="'地址管理'" :back="'/user'" v-if="from === 'mine'"></simple-header>
    <van-nav-bar title="地址管理" right-text="确定" left-arrow @click-left="onClickLeft" @click-right="onClickRight" fixed placeholder v-else />
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" v-if="from !== 'mine'" />
    <van-address-list class="my-address-list" v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" v-else />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAddressList } from '@/api/addressAPI.js'
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'

export default {
  name: 'Address',
  components: {
    SimpleHeader
  },
  data() {
    return {
      chosenAddressId: '',
      list: [],
      from: this.$route.query.from
    }
  },
  computed: {
    defaultChosenId() {
      if (this.list.length > 0) {
        if (this.$route.query.addressId) return Number(this.$route.query.addressId)
        return this.list.filter(item => item.isDefault)[0].id
      } else {
        return ''
      }
    }
  },
  methods: {
    async init() {
      const { data: res } = await getAddressList()
      if (res.resultCode === 200) {
        this.list = res.data.map(item => {
          return {
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
            isDefault: Boolean(item.defaultFlag)
          }
        })
        this.chosenAddressId = this.defaultChosenId
      }
    },
    onAdd() {
      this.$router.push({ path: `/address-edit?type=add&from=${this.from}` })
    },
    onEdit(item, index) {
      this.$router.push({ path: `/address-edit?type=edit&addressId=${item.id}&from=${this.from}` })
    },
    onClickLeft() {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
    },
    onClickRight() {
      this.$router.push({ path: `/create-order?addressId=${this.chosenAddressId}&from=${this.from}` })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.address-box {
  /deep/ .van-nav-bar__text {
    font-size: 16px;
  }
  /deep/ .van-radio__icon--checked {
    .van-icon {
      background-color: @primary;
      border-color: @primary;
    }
  }
  /deep/ .van-address-item__tag {
    background-color: @primary;
  }
  .van-button {
    background: @primary;
    border-color: @primary;
  }
  .my-address-list {
    /deep/ .van-radio__icon {
      display: none;
    }
  }
}
</style>
