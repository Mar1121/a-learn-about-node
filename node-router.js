// express中的路由
// 路由 请求的类型、请求的URL地址、处理函数

const express = require('express');
const app = express();

// app.METHOD(PATH,HANDLE)
// 挂载路由 并不常用 挂载到app上


// 模块化路由  抽离为单独的路由模块 方便管理 代码量少 相对挂载路由
// 1.创建路由模块对应的.js文件
// 2.调用express.Router()函数创建路由对象
// 3.在路由对象上挂载具体的路由
// 4.使用module.exports向外共享路由对象
// 5.使用app.use()函数注册路由模块
