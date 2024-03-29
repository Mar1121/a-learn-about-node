// 导入数据库操作模块
const db = require('../db.js')
// 导入 bcryptjs
const bcryptjs = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {

    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
    // console.log(userInfo);
    // 对表单中的数据 进行合法性的校验
    // if (!userInfo.username || !userInfo.password) {
    //     // return res.send({ status: 1, msg: '用户名或密码不能为空' })
    //     return res.cc('用户名或密码不能为空')
    // }

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
    // 接收表单数据
    const userInfo = req.body
    // 定义sql语句
    const sql = 'select * from ev_users where username=?'
    // 执行sql语句 根据用户名查询用户的信息
    db.query(sql, userInfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
        // 执行sql语句成功，但是查询到数据条数不等于1
        console.log(results);
        if (results.length !== 1) return res.cc('登录失败')
        // 判断密码是否正确
        const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败，密码错误')
        }

        // 在服务器端生成Token字符串
        const user = { ...results[0], password: '', user_pic: '' }
        // console.log(user);
        // 对用户的信息进行加密 生成token字符串
        const tokenStr = jwt.sign(user, config.jwtScreenKey, {
            expiresIn: config.expiresIn
        })
        // console.log(tokenStr);
        // 将token相应给客户端
        res.send({
            status: 0,
            msg: '登录成功',
            token: 'Bearer ' + tokenStr
        })
        // res.send('用户登录成功');
    })
}