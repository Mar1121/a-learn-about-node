// 模拟一个类似于express.urlencoded 来解析post提交到服务器表单的数据
// 1.定义中间件
// 2.监听req的data事件
// 3.监听req的end事件
// 4.使用querystring模块解析请求体数据
// 5.将解析出来的数据对象挂载为req.body
// 6.将自定义中间件封装起来

const express = require('express');
const app = express();

const qs = require('querystring');

app.use((req, res, next) => {

})