<template>
  <div class="address-edit-box">
    <simple-header :navTitle="'编辑地址'"></simple-header>
    <van-address-edit :area-list="areaList" :address-info="addressInfo" :show-delete="type === 'edit'" show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { areaList } from '@vant/area-data'
import { getAddressDetail, addAddress, editAddress, deleteAddress } from '@/api/addressAPI'
import { tdist } from '@/common/js/utils.js'
import { Toast } from 'vant'

export default {
  name: 'AddressEdit',
  components: {
    SimpleHeader
  },
  data() {
    return {
      // 地址编辑类型（新增/修改）
      type: 'add',
      // 地址初始值
      addressInfo: {},
      areaList,
      searchResult: [],
      addressId: '',
      from: ''
    }
  },
  methods: {
    async init() {
      const { type, addressId, from } = this.$route.query
      this.type = type
      this.addressId = addressId
      this.from = from
      if (type === 'edit') {
        const { data: addressDetail } = await getAddressDetail(addressId)
        let _areaCode = ''
        const province = tdist.getLev1()
        Object.entries(this.areaList.county_list).forEach(([id, text]) => {
          // 先找出当前对应的区
          if (text === addressDetail.data.regionName) {
            // 找到区对应的几个省份
            const provinceIndex = province.findIndex(item => item.id.substr(0, 2) === id.substr(0, 2))
            // 找到区对应的几个市区
            const cityItem = Object.entries(this.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) === id.substr(0, 4))[0]
            let province_ = addressDetail.data.provinceName
            if (province_.endsWith('市')) province_ = province_.slice(0, -1)
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (province[provinceIndex].text === province_ && cityItem[1] === addressDetail.data.cityName) {
              _areaCode = id
            }
          }
        })
        this.addressInfo = {
          id: addressDetail.data.addressId,
          name: addressDetail.data.userName,
          tel: addressDetail.data.userPhone,
          province: addressDetail.data.provinceName,
          city: addressDetail.data.cityName,
          county: addressDetail.data.regionName,
          addressDetail: addressDetail.data.detailAddress,
          areaCode: _areaCode,
          isDefault: Boolean(addressDetail.data.defaultFlag)
        }
      }
    },
    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: Number(content.isDefault)
      }
      if (this.type === 'edit') params.addressId = this.addressId
      const { data: res } = this.type === 'add' ? await addAddress(params) : await editAddress(params)
      if (res.resultCode === 200) {
        Toast.success('保存成功')
        setTimeout(() => {
          this.$router.push({ path: `/address?from=${this.from}` })
        }, 1000)
      }
    },
    async onDelete() {
      const { data: res } = await deleteAddress(this.addressId)
      if (res.resultCode === 200) {
        Toast.success('删除成功')
        setTimeout(() => {
          this.$router.push({ path: '/address' })
        }, 1000)
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.address-edit-box {
  /deep/ .van-address-edit__buttons .van-button--danger {
    background: @primary;
    border-color: @primary;
  }
  /deep/ .van-address-edit__default {
    .van-switch--on {
      background: @primary;
    }
  }
}
</style>
