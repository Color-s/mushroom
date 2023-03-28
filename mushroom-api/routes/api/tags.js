const express = require('express')
const TagModel = require('../../modeles/Tags')
const router = express.Router()

const validateInsertTag = require('../../validator/insertTag')

router.get('/all-tags', (req, res) => {
    TagModel.find((errors, results) => {
        return res.json({ data: results })
    })
})

router.get('/', (req, res) => {
    const name = req.body.name;
    const sql = 'name=\"' + name + "\"";
    TagModel.find(sql, (errors, results) => {
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
    TagModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({ data: results })
        } else {
            return res.json({ data: [] })
        }
    })
})

router.post('/', (req, res) => {
    const { err, isValid } = validateInsertTag(req.body);

    if (!isValid) {
        res.status(400).json(err)
    } else {

        const tagName = req.body.name;
        const tagColor = req.body.color;
        const tagDesc = req.body.desc;

        TagModel.insert({ name: tagName, color: tagColor, description: tagDesc }, (errors, results) => {
            if (!errors) {
                return res.json({ row: 1 })
            } else {
                return res.json({ row: 0 })
            }
        })
    }
})

router.put('/', (req, res) => {
    const tagId = req.body.id;
    const tagName = req.body.name;
    const tagColor = req.body.color;
    const tagDesc = req.body.desc;

    TagModel.update('id=' + tagId, { name: tagName, color: tagColor, description: tagDesc }, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    TagModel.delete("id=" + id, (errors, results) => {
        if (!errors) {
            return res.json({ row: 1 })
        } else {
            return res.json({ row: 0 })
        }
    })
})

module.exports = router