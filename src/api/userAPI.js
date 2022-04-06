import http from '@/utils/request.js'

export const loginAPI = data => {
  return http.post('/user/login', data)
}

export const registerAPI = data => {
  return http.post('/user/register', data)
}

export const getUserInfo = () => {
  return http.get('/user/info')
}

export const editUserInfo = params => {
  return http.put('/user/info', params)
}

export const logout = () => {
  return http.post('/user/logout')
}
