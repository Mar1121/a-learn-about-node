const express = require('express');
const router = express.Router();



// 在这里挂载对应的路由
// 定义get接口
router.get('/get', function (req, res) {
    // 通过req.query获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    // 调用res.send()方法，向客户端响应处理的结果
    console.log(query);
    res.send({
        status: 0,// 0 表示处理成功 1表示处理失败
        msg: 'GET 请求成功！',//状态的描述
        data: query // 需要响应给客户端的数据
    });
})

// 定义post接口
router.post('/post', function (req, res) {
    // 通过req.body 获取请求体中包含的 url-encoded 格式的数据
    const body = req.body;
    console.log('客户端的post请求', body);
    // 调用req.send 返回响应结果
    res.send({
        status: 0,
        msg: 'POST请求成功',
        data: body
    })
})

module.exports = router;