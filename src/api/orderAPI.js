import http from '@/utils/request.js'

export const createOrder = params => {
  return http.post('/saveOrder', params)
}

export const payOrder = params => {
  return http.get('/paySuccess', { params })
}

export const getOrderList = params => {
  return http.get('/order', { params })
}

export const getOrderDetail = id => {
  return http.get(`/order/${id}`)
}

export const confirmOrder = id => {
  return http.put(`/order/${id}/finish`)
}

export const cancelOrder = id => {
  return http.put(`/order/${id}/cancel`)
}
