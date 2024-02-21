// 1.安装操作MySQL数据库的第三方模块(mysql)
// 2.通过mysql模块连接到MySql数据库
// 3.通过mysql模块执行SQL语句

// 配置mysql文件
// 1.导入mysql模块
const mysql = require('mysql')
// 2.建立与MySQL数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的IP地址
    user: 'root', //登录数据库的账号
    password: 'root',
    database: 'node-learning' //指定要连接的数据库
})

// // 测试mysql模块能否正常工作
// db.query('select 1', (err, results) => {
//     // mysql模块工作期间报错了
//     if (err) return console.log(err.message);
//     // 正常执行
//     console.log(results);
// })

// 查询某表中所有的数据
// const sqlStr = 'select * from users'
// db.query(sqlStr, (err, results) => {
//     // 查询失败
//     if (err) {
//         console.log(err.message);
//     }
//     // 查询数据成功
//     // 如果执行的是select查询语句 则执行的结果是数组
//     console.log(results);
// })

// 向users表中新增一条数据 其中username的值为Spider-man，password
// const user = { username: 'Spider-man', password: 'pcc123456' }
// // 定义待执行的sql语句
// const sqlStr = 'insert into users (username, password) values(?, ?)'
// // 执行sql语句
// db.query(sqlStr, [user.username, user.password], (err, results) => {
//     if (err) return console.log(err.message);
//     // 成功了
//     // 如果执行的是insert into 插入语句 则results是一个对象
//     // 可以通过affectedRows属性，来判断是否插入数据成功
//     if (results.affectedRows === 1) {
//         console.log('插入数据成功');
//         console.log(results);
//     }
// })

//插入数据的便携方式
// const user = { username: 'Spider-man2', password: 'pcc123456666' }
// // 定义待执行的SQL语句
// const sqlStr = 'insert into users set ?'
// db.query(sqlStr, user, (err, results) => {
//     if (err) console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log('插入数据成功');
//     }
// })

// 更新用户信息
// const user = { id: 1, username: 'Spider-man3', password: 'pcc1234567777' }
// const sqlStr = 'update users set username=?,password=? where id=?'
// db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
//     if (err) return console.log(err.message);
//     // 执行了update语句之后，执行的结果也是一个对象
//     if (results.affectedRows === 1) {
//         console.log('更新成功');
//     }
// })

// 使用DELete 语句删除 会真正的从表中把数据删除 建议标记删除
// 删除id为2的用户
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 1], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('删除成功');
    }
})