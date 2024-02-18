// express的基本用法
const express = require('express');
// 创建web服务器
const app = express();
// 启动服务器
app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
});
// 监听get请求
// 客户端请求的URL地址
// 请求对应的处理函数
app.get('/user', function (req, res) {

    // req.query 默认是一个空对象
    // 客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数
    // 可以通过req.query 对象访问到  req.query.name

    // 将内容响应给客户端
    // res.send()时express模块提供的一个方法
    res.send('Hello World!');

});

// 监听post请求
app.post('/user', function (req, res) {
    // 返回一个json对象
    res.send({ name: 'zs', age: 20 });
});

// 动态参数监听，这里的：id是一个动态参数
app.get('/user/:id', function (req, res) {
    // req.params 是动态匹配到的URL参数 默认是一个空对象
    console.log(req.params);
    res.send(req.params)
})