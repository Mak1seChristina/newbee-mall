const express = require('express')

const app = express()

// 安装并配置网络传输压缩的中间件
const compression = require('express-compression')
app.use(compression())

app.use(express.static('./dist'))

app.listen(3003, () => {
  console.log('Express server running at http://127.0.0.1:3003')
})
