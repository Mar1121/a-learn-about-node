// express中间件的调用流程
// 当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

// express 中间件的格式 本质是一个function处理函数
// 注意：中间件函数的形参列表中，必须包含next参数。而路由函数中只包含req和res

// next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由

// 定义一个简单的中间件

const express = require('express');
const app = express();

// 中间件函数
const mw = function (req, res, next) {
    console.log('一个简单的中间件函数');
    // 把流转关系 转交给下一个中间件或路由
    next();
}
app.use(mw)
// 错误级别中间件
app.use((err, req, res, next) => {
    console.log('出现错误，错误级别中间件触发');
})
app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
})

// 全局中间件
// 客户端发起的任何请求，到达服务器之后，都会出发的中间件，叫做全局生效的中间件
// 通过调用app.use(中间件函数)，即可定义一个全局生效的中间件

// 中间件的作用
// 多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中
// 统一为req或res对象添加自定义的属性和方法，供下游的中间件或路由进行使用

// 局部生效的中间件


// 中间件的五个使用注意事项
// 1.一定要在路由之前注册中间件
// 2.客户端发送过来的请求，可以连续调用多个中间件进行处理
// 3.执行完中间件的业务代码之后，不要忘记调用next()函数
// 4.为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
// 5.连续调用多个中间件时，多个中间件之间，共享req和res对象

// 中间件分类
// 1.应用级别中间件 通过app.use()或app.get()或qpp.post(),绑定到app实例上的中间件
// 2.路由级别中间件 绑定到express.Router()实例上的中间件
// 应用级别中间件时绑定到app实例上，路由级别中间件绑定到router实例上
// 3.错误级别中间件：专门用来捕获整个项目中发生的异常错误，防止项目异常崩溃
// 四个形参 (err,req,res,next)
// 4.Express内置的中间件：内置了三个常用的中间件
// 1) express.static 快速托管静态资源的内置中间件 例如：HTML文件、图片、css样式（无兼容性）
// 配置解析 application/json格式数据的内置中间件
// 2) express.json 解析JSON格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
// app.use(express.json())
// 配置解析 application/x-www-form-url lencoded 格式数据的内置中间件
// 3) express.urlencoded解析URL-encoded格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
// app.use(express.urlencoded({ extended: false }))
// 5.第三方中间件：非express官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件
// 例如在express@4.16.0之前的版本中，经常使用body-parser这个第三方中间件，来解析请求体数据
// 如果没有配置任何解析表单数据的中间件，则req.body默认等于undefined
// 还是使用app.use()注册中间件

// 
