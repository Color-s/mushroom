const express = require('express');
const UserModel = require('../../modeles/User');
const router = express.Router();

// 引入校验
const validateLoginInput = require('../../validator/login');
const validateInsertUser = require('../../validator/insertUser');

// $route GET /api/users/test
// @desc 返回的请求的json数据
// @access public
router.get('/all-user', (req, res) => {
    UserModel.find((errors, results) => {
        return res.json({ data: results })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    UserModel.find('id=' + id, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.get('/', (req, res) => {
    const username = req.query.username;
    const sql = 'username=\"' + username + "\"";
    console.log(req.query.username)
    UserModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } else {

        const username = req.body.username;
        const password = req.body.password;

        const sql = "username=\"" + username + "\""
        UserModel.find(sql, (err, results) => {
            if (password == results[0].password) {
                return res.json({ success: true, msg: results[0] })
            } else {
                return res.status(400).json({ password: "密码错误！" })
            }
        })
    }
})

router.post("/", (req, res) => {
    const { errors, isValid } = validateInsertUser(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const uName = req.body.username;
        const uPassword = req.body.password;
        const uTel = req.body.tel;
        const uEmail = req.body.email;
        const uRole = req.body.role;
        UserModel.insert({ username: uName, password: uPassword, tel: uTel, email: uEmail, role: uRole }, (err, results) => {
                if (!err) {
                    return res.json({ row: 1 })
                } else {
                    return res.json({ row: 0 })
                }
        })
        
    }
})

router.put('/', (req, res) => {
    const uId = req.body.id;
    const uName = req.body.username;
    const uPassword = req.body.password;
    const uTel = req.body.tel;
    const uEmail = req.body.email;
    const uRole = req.body.role;

    if (uId == null || uId == '') {
        return res.status(404).json("传入参数错误");
    } else {
        UserModel.update("id=" + uId, { username: uName, password: uPassword, tel: uTel, email: uEmail, role: uRole }, (errors, results) => {
            if (!errors) {
                return res.json({ row: 1 })
            } else {
                return res.json({ row: 0 })
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    UserModel.delete('id=' + id, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

module.exports = router;