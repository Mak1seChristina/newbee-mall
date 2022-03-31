import http from '@/utils/request.js'

export const getHome = () => {
  return http.get('/index-infos')
}
