import http from '@/utils/request.js'

export const getCart = params => {
  return http.get('/shop-cart', { params })
}

export const addCart = params => {
  return http.post('/shop-cart', params)
}

export const modifyCart = params => {
  return http.put('/shop-cart', params)
}

export const deleteCartItem = id => {
  return http.delete(`/shop-cart/${id}`)
}

export const getByCartItemIds = params => {
  return http.get('/shop-cart/settle', { params })
}
