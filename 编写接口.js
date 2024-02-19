// 导入express
const express = require('express')
// 创建服务器实例
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 创建API路由模块
// 导入路由模块
const router = require('./路由模块-编写接口')
// 把路由模块注册到app上
app.use('/api', router)

// 启动服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})
