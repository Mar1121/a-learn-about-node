// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db')



// 这是获取文章分类列表的数据的路由
exports.getArtCates = (req, res) => {

    // 定义查询分类列表数据的SQL语句
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`

    // 执行sql语句
    db.query(sql, (err, results) => {
        // 1. 执行SQL语句失败
        if (err) return res.cc(err)
        // 2. 执行SQL语句成功，但是查询到的数据不包含数组
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}

// 新增文章分类的处理函数
exports.addArtCates = (req, res) => {
    // 定义查重的sql语句
    const sql = `select * from ev_article_cate where name=? or alias=?`
    // 执行
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            res.cc(err)
        }
        // 判断 分类名称 和 分类别名 是否被占用
        // 判断数据的length
        if (results.length === 2) {
            return res.cc('分类名称与分类别名被占用,请更换后重试')
        }
        // 判断数据length = 1的三种情况
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('分类名称与分类别名被占用,请更换后重试')
        }
        // 
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用,请更换后重试')
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用,请更换后重试')
        }
        // TODO新增成功
        // res.send({
        //     status: 0,
        //     message: '新增文章分类成功！'
        // })
    })
}