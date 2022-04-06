<template>
  <div class="login">
    <!-- <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder /> -->
    <simple-header :navTitle="navTitle" :back="'/home'"></simple-header>
    <img src="@/assets/mlogo.png" alt="" id="logo" />
    <van-form @submit="onSubmit">
      <van-field v-model="mobile" type="tel" label="手机号码" placeholder="请输入手机号码" :rules="rules.mobile" />
      <van-field v-model="password" type="password" label="密码" placeholder="密码" :rules="rules.password" />
      <div style="margin: 16px; margin-bottom: 20px">
        <van-button round block type="info" native-type="submit" id="submitButton">{{ navTitle }}</van-button>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" id="switchButton" native-type="button" @click="switchState">立即{{ switchTitle }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入 api
import { loginAPI, registerAPI } from '@/api/userAPI.js'
// 导入 mutations 映射
import { mapMutations } from 'vuex'
import { Toast } from 'vant'
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader.vue'

export default {
  name: 'Login',
  components: {
    SimpleHeader
  },
  data() {
    return {
      isLogin: true,
      mobile: '',
      password: '',
      rules: {
        // 手机号的验证规则
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          // 十一位手机号验证规则
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ],
        // 密码验证规则
        password: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    ...mapMutations('userAbout', ['updateToken']),
    onClickLeft() {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
    },
    // 切换登录/注册状态
    switchState() {
      // e.preventDefault()
      this.isLogin = !this.isLogin
      // 清空表单
      this.mobile = ''
      this.password = ''
    },
    // 表单提交事件
    async onSubmit() {
      if (this.isLogin) {
        const params = {
          loginName: this.mobile,
          passwordMd5: this.$md5(this.password)
        }
        const { data: res } = await loginAPI(params)
        if (res.resultCode === 200) {
          this.updateToken(res.data)
          // 跳转至登录未遂的路径
          const prePath = this.$route.query.pre || '/'
          this.$router.replace(prePath)
        }
      } else {
        const params = {
          loginName: this.mobile,
          password: this.password
        }
        const { data: res } = await registerAPI(params)
        if (res.resultCode === 200) {
          Toast.success('注册成功')
          this.switchState()
        }
      }
    }
  },
  computed: {
    navTitle() {
      return this.isLogin ? '登录' : '注册'
    },
    switchTitle() {
      return this.isLogin ? '注册' : '登录'
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  #logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 40px auto 0px;
  }
  #submitButton {
    background-color: rgb(27, 174, 174);
    border-color: rgb(27, 174, 174);
  }
  #switchButton {
    background-color: rgb(190, 190, 190);
    border-color: rgb(190, 190, 190);
  }
}
</style>
