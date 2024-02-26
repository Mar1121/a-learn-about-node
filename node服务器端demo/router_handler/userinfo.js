// 导入数据库操作模块
const db = require('../db')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {

    // 定义查询用户信息的SQL语句
    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`

    db.query(sql, req.user.id, (err, results) => {
        // 执行SQL语句失败
        if (err) {
            return res.cc(err)
        }
        // 执行SQL语句成功 但是查询的结果可能为空
        if (results.length !== 1) {
            return res.cc('获取用户信息失败！')
        }

        // 用户信息获取成功
        res.send({
            status: 0,
            msg: '获取用户基本信息成功！',
            data: results[0]
        })
    })


}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    // 定义更新用户基本信息的SQL语句
    const sql = 'update ev_users set ? where id=?'
    // res.send('ok')
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('更新用户基本信息失败！')
        }
        // 成功的结果
        res.cc('更新用户基本信息成功！', 0)
    })

}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // res.send('ok')
    // 根据id查询用户的信息
    const sql = 'select * from ev_users where id=?'
    // 执行根据id查询用户信息的sql语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        // 判断结果是否存在
        if (results.length !== 1) {
            return res.cc('用户不存在！')
        }
        // 判断用户的旧密码是否输入正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.cc('旧密码输入错误！')
        }
        // 更新数据库中的代码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // 执行sql语句失败
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('更新密码失败！')
            }
        })
        res.cc('更新密码成功')
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    // 定义更新头像的SQL语句
    const sql = 'update ev_users set user_pic=? where id=?'
    // 执行SQL语句
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        //
        if (err) {
            return res.cc(err)
        }
        // 
        if (results.affectedRows !== 1) {
            return res.cc('更换头像失败！')
        }
        res.cc('更换头像成功', 0)
    })
    res.send('ok')
}