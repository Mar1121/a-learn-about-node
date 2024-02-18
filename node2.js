// 托管静态资源
// express.static() 可以非常方便地创建一个静态资源服务器
const express = require('express');
const app = express();
// 将public目录下的图片、css文件、javaScript文件对外开放访问
// app.use(express.static('public'));
// !!!!
// 注意：Express在指定的静态目录中查找文件，
// 并对外提供资源的访问路径，因此，存放静态文件的目录名不会出现在URL中

app.use(express.static('./public'))
// 挂载路径前缀
app.use('/public', express.static('./public'))

// 托管多个和静态资源目录 多次调用express.static()函数

app.listen(80, function () {
    console.log('Server is running at http://127.0.0.1');
})