// 导入express
const express = require('express');
// 创建服务器的实例对象
const app = express()

const joi = require('joi')


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

// 解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
// 配置解析token的中间件
app.use(expressJWT({ secret: config.jwtScreenKey }).unless({ path: [/^\/api/] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户路由模块
const userInfoRouter = require('./router/userinfo')
app.use('/my', userInfoRouter)

// 导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 导入并使用文章的路由模块
const articleRouter = require("./router/aiticle")
app.use("/my/article", articleRouter)



// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    //未知的错误
    res.cc('未知的错误')
})

// 启动服务器
app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
});
