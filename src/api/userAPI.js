import http from '@/utils/request.js'

export const loginAPI = data => {
  return http.post('/user/login', data)
}

export const registerAPI = data => {
  return http.post('/user/register', data)
}
