// 导入数据库操作模块
const db = require('../db.js')
// 导入 bcryptjs
const bcryptjs = require('bcryptjs')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
    // console.log(userInfo);
    // 对表单中的数据 进行合法性的校验
    if (!userInfo.username || !userInfo.password) {
        // return res.send({ status: 1, msg: '用户名或密码不能为空' })
        return res.cc('用户名或密码不能为空')
    }

    // 定义sql语句查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) {
            // console.log(err);
            // return res.send({ status: 1, msg: err.message })
            return res.cc(err)
        }
        // 成功 判断用户名是否被占用
        console.log(results);
        if (results.length > 0) {
            console.log(1111);
            // return res.send({ status: 1, msg: '用户名被占用，请更换其他用户名' })
            return res.cc('用户名被占用，请更换其他用户名')
        }

        // 调用bcrypt.hashSync() 对密码进行加密
        userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

        // 定义插入新用户的SQL语句
        const sql = 'insert into ev_users set ?'
        // 执行sql语句
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) {
                // return res.send({ status: 1, msg: err.message })
                return res.cc(err)
            }
            // 判断影响行数是否为1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, msg: '注册用户失败，请稍后再试' })
                return res.cc('注册用户失败，请稍后再试')
            }
            // 注册用户成功
            res.cc('注册成功!!!', 0)
        })


    })


}


// 登录的处理函数
exports.login = (req, res) => {
    res.send('用户登录');
}