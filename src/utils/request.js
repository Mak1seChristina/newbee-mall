import router from '@/router'
import axios from 'axios'
import { Toast } from 'vant'

import userStore from '@/store/userAbout.js'

const http = axios.create({
  baseURL: 'http://backend-api-01.newbee.ltd/api/v1'
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 展示 loading 效果
    /* setTimeout(() => {
      Toast.loading({
        message: '加载中...',
        duration: 0
      })
    }, 20) */

    // 获取 token 值
    const tokenStr = userStore.state.token
    // 请求头中添加 token
    if (tokenStr) {
      config.headers.token = tokenStr
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  res => {
    // 关闭 loading 提示
    Toast.clear()
    if (typeof res.data !== 'object') {
      Toast.fail('服务端异常！')
      return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
      if (res.data.message) Toast.fail(res.data.message)
      if (res.data.resultCode === 416) {
        router.push({ path: '/login' })
      }
      return Promise.reject(res.data)
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
