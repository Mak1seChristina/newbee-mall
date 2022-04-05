import http from '@/utils/request.js'

export const getCategory = () => {
  return http.get('/categories')
}
