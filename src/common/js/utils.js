// 图片路径前缀
export const prefix = url => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    return `http://backend-api-01.newbee.ltd${url}`
  }
}
