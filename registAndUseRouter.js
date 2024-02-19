const express = require('express');
const app = express();

// 导入路由模块
const router = require('./路由模块/rrouter')
// 注册路由模块
// app.use() 函数的作用是用来注册全局中间件
app.use(router)
// 给路由模块添加同意的路由前缀
// app.use('/api',router) 

app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
})