<template>
  <div class="user-box">
    <simple-header :navTitle="'我的'"></simple-header>
    <div class="user-info">
      <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" alt="" />
      <div class="user-desc">
        <p>昵称：{{ userInfo.nickName }}</p>
        <p>登录名：{{ userInfo.loginName }}</p>
        <p>个性签名：{{ userInfo.introduceSign }}</p>
      </div>
    </div>
    <ul class="user-list">
      <li @click="goTo('/order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/user-setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/address?from=mine')">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getUserInfo } from '@/api/userAPI.js'

export default {
  name: 'User',
  components: {
    SimpleHeader
  },
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    async initUserInfo() {
      const { data: res } = await getUserInfo()
      if (res.message === 'SUCCESS') {
        this.userInfo = res.data
      }
    },
    goTo(path) {
      this.$router.push({ path })
    }
  },
  created() {
    this.initUserInfo()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.user-box {
  .user-info {
    display: flex;
    align-items: center;
    width: 94%;
    height: 115px;
    margin: 10px auto;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-left: 20px;
    }
    p {
      margin: 0;
      margin-bottom: 5px;
    }
    .user-desc {
      margin-left: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
  .user-list {
    margin-top: 20px;
    padding: 0 20px;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      color: #2c3e50;
    }
  }
}
</style>
