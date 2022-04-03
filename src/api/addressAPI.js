import http from '@/utils/request'

export const getDefaultAddress = () => {
  return http.get('/address/default')
}

export const getAddressDetail = id => {
  return http.get(`/address/${id}`)
}

export const getAddressList = () => {
  return http.get('/address', { pageNumber: 1, pageSize: 1000 })
}

export const addAddress = params => {
  return http.post('/address', params)
}

export const editAddress = params => {
  return http.put('/address', params)
}

export const deleteAddress = id => {
  return http.delete(`/address/${id}`)
}
