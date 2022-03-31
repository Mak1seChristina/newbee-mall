import http from '@/utils/request.js'

export const getGoodDetail = id => {
  return http.get(`/goods/detail/${id}`)
}
