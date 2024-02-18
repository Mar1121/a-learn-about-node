var express = require('express');
// 创建路由对象
var router = express.Router();
// 挂载获取用户列表的路由
router.get('/user/list', function (req, res) {
    res.send('Get user list');
})
// 挂载添加用户的路由
router.post('/user/add', function (req, res) {
    res.send('Add new user');
})
// 向外导出路由对象
module.exports = router;