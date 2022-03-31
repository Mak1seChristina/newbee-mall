import http from '@/utils/request.js'

export const getCart = params => {
  return http.get('/shop-cart', { params })
}

export const addCart = params => {
  return http.post('/shop-cart', params)
}
