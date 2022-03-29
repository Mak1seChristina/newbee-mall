import axios from 'axios'

const http = axios.create({
  baseURL: 'http://backend-api-01.newbee.ltd/api/v1'
})

export default http
