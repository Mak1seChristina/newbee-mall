<template>
  <div class="setting-box">
    <simple-header :navTitle="'账号管理'"></simple-header>
    <div class="avatar-area">
      <van-image round width="3rem" height="3rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" @click="$refs.avaInput.click()" />
      <input type="file" accept="image/*" v-show="false" ref="avaInput" @change="onChange" />
    </div>
    <div class="form-area">
      <van-form @submit="onSubmit">
        <van-field v-model="nickName" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="introduceSign" label="个性签名" placeholder="请输入个性签名" />
        <van-field v-model="password" label="修改密码" placeholder="请输入密码" type="password" />
      </van-form>
      <div style="margin: 16px">
        <van-button round block type="info" color="#1baeae" native-type="submit" @click="onSubmit">保存</van-button>
        <van-button round block type="info" color="rgb(190, 190, 190)" @click="logout">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'
import { getUserInfo, editUserInfo, logout } from '@/api/userAPI.js'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'

export default {
  name: 'UserSetting',
  components: {
    SimpleHeader
  },
  data() {
    return {
      avatar: null,
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations('userAbout', ['clearState']),
    async initUserInfo() {
      const { data: res } = await getUserInfo()
      if (res.message === 'SUCCESS') {
        this.nickName = res.data.nickName
        this.introduceSign = res.data.introduceSign
      }
    },
    onChange(e) {
      const files = e.currentTarget.files
      if (files.length === 0) return
      const fd = new FormData()
      fd.append('avatar', files[0])
      this.avatar = fd
      // avatar 可以在触发 submit 时作为参数发起请求
    },
    async onSubmit() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: this.$md5(this.password)
      }
      const { data: res } = await editUserInfo(params)
      if (res.message === 'SUCCESS') {
        Toast.success('保存成功')
      }
    },
    async logout() {
      const { data: res } = await logout()
      if (res.message === 'SUCCESS') {
        this.clearState()
        this.$router.replace({ path: '/' })
      }
    }
  },
  created() {
    this.initUserInfo()
  }
}
</script>

<style lang="less" scoped>
.setting-box {
  .avatar-area {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .form-area {
    margin-top: 10px;
    .van-cell {
      /deep/ input {
        padding-right: 30px;
      }
    }
    .van-button[type='submit'] {
      margin-bottom: 20px;
    }
  }
}
</style>
