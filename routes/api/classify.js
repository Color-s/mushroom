const express = require('express')
const router = express.Router()
const ClassifyModel = require('../../modeles/Classify')

const validateInsertClassify = require('../../validator/insertClassify')

router.get('/all-classify', (req, res) => {
    ClassifyModel.find((errors, results) => {
        return res.json({ data: results })
    })
})

router.get('/', (req, res) => {
    const name = req.query.name;
    const sql = 'name=\"' + name + "\"";
    ClassifyModel.find(sql, (errors, results) => {
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
    ClassifyModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.post('/', (req, res) => {
    const { errors, isValid } = validateInsertClassify(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    } else {

        const cName = req.body.name;
        const cColor = req.body.color;
        const cDesc = req.body.desc;

        ClassifyModel.insert({ name: cName, color: cColor, description: cDesc }, (err, results) => {
            if (!err) {
                return res.json({ row: 1 })
            } else {
                return res.json({ row: 0 })
            }
        })
    }
})

router.put('/', (req, res) => {
    const cId = req.body.id;
    const cName = req.body.name;
    const cColor = req.body.color;
    const cDesc = req.body.desc;

    ClassifyModel.update('id=' + cId, { name: cName, color: cColor, description: cDesc }, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    ClassifyModel.delete("id=" + id, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

module.exports = router