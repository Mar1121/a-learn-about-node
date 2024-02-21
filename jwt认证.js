const express = require('express')
const app = express()

// 导入jwt相关的包
const jwt = require('jsonwebtoken')
// 导入express-jwt
const expressJwt = require('express-jwt')


// 定义一个用于加密和解密的secret密钥
// 为了保证JWT字符串的安全性，防止JWT字符串在网络传输过程中被别人破解 我们需要专门定义一个用于加密和解密的secret密钥
// 1.当生成JWT字符串的时候 需要使用secret密钥对用户的信息进行加密 最终得到加密好的JWT字符串
// 2.当把JWT字符串解析还原成JSON对象的时候 需要使用secret密钥进行解密
const secretKey = 'Mar'
// 登录成功之后 调用jwt.sign()方法生成JWT字符串 并通过token属性发送给客户端
// 参数1：用户的信息对象
// 参数2：加密的密钥
// 参数3：配置对象，可以配置当前token的有效期
// 为了安全性 不要把密码加密到jwt中
const tokenStr = jwt.sign({ username: 'Tom' }, secretKey, { expiresIn: '30s' }) //这个就是token

// 注册将JWT字符解析还原成JSON对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件就可以把解析出来的用户信息 挂载到req.user 属性上

//将jwt字符串还原为JSON对象

app.use(expressJwt({
    secret: secretKey
}).unless({
    pass: []//哪些接口不需要
}))//


// 捕获解析Token字符串时，如果客户端发送过来的Token字符串过期或不合法 会产生一个解析失败的错误 影响项目的正常运行 
// 我们可以通过Express的错误中间件 捕获这个错误并进行相关的处理 
app.use((err, req, res, next) => {
    // token解析失败导致的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token'
        })
    }
    res.send({
        status: 500,
        message: '未知错误'
    })
})