const express = require('express')
const InfoModel = require('../../modeles/Info')
const router = express.Router()

const validateInsertInfo = require('../../validator/insertInfo')

router.get('/all', (req, res) => {
    InfoModel.sql('SELECT * FROM info order by create_time desc', (errors, results) => {
        return res.json({ data: results })
    })
})

router.get('/top', (req, res) => {
    InfoModel.sql('SELECT * FROM info order by create_time desc', (errors, results) => {
        return res.json({ data: results })
    })
})

router.get('/', (req, res) => {
    const title = req.query.title;
    const sql = 'SELECT * FROM info where POSITION(\"' + title + '\" in title) order by create_time desc ';
    InfoModel.sql(sql, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'id=\"' + id + "\"";
    InfoModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.post('/', (req, res) => {
    const { err, isValid } = validateInsertInfo(req.body);

    if (!isValid) {
        return res.status(400).json(err)
    } else {

        const iUserId = req.body.userId;
        const iTitle = req.body.title;
        const iMsg = req.body.msg;
        const iPhoto = req.body.photo;
        const iWeight = req.body.weight;
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':00';

        InfoModel.insert({ user_id: iUserId, title: iTitle, photo: iPhoto, msg: iMsg, weight: iWeight, create_time: time }, (errors, results) => {
            if (!errors) {
                return res.json({ row: 1 })
            } else {
                return res.json({ row: 0 })
            }
        })
    }
})

router.put('/', (req, res) => {
    const iId = req.body.id;
    const iUserId = req.body.userId;
    const iTitle = req.body.title;
    const iPhoto = req.body.photo;
    const iMsg = req.body.msg;
    const iWeight = req.body.weight;

    InfoModel.update('id=' + iId, { user_id: iUserId, title: iTitle, photo: iPhoto, weight: iWeight, msg: iMsg }, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    InfoModel.delete("id=" + id, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

module.exports = router