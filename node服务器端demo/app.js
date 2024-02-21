// 导入express
const express = require('express');
// 创建服务器的实例对象
const app = express()

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件 只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 在路由之前封装res.send
app.use((req, res, next) => {
    res.cc = function (err, status = 1) { //status 的值为1 表示失败的情况
        // err的值 可能是一个错误的对象，也可能是一个错误的字符串
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })

    }
    next()
})


// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 启动服务器
app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
});
