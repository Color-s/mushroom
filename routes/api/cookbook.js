const express = require('express')
const router = express.Router()
const CookbookModel = require('../../modeles/Cookbook')

const validateInsertCookbook = require('../../validator/insertCookbook')

router.get('/all', (req, res) => {
    CookbookModel.find((errors, results) => {
        return res.json({data: results})
    })
})

router.get('/', (req, res) => {
    const name = req.query.name;
    const sql = 'name=\"' + name + "\"";
    CookbookModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'id=\"' + id + "\"";
    CookbookModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    })
})

router.get('/type/:name', (req, res) => {
    const cType = req.params.name;
    const sql = 'type=\"' + cType + "\"";
    CookbookModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    })
})

router.post('/', (req, res) => {
    const {err, isValid} = validateInsertCookbook(req.body);

    if (!isValid) {
        return res.status(400).json(err)
    } else {

    const cName = req.body.name;
    const cType = req.body.type;
    const cDesc = req.body.desc;
    const mushroomId = req.body.mushroomId;

    CookbookModel.insert({name: cName, type: cType, description: cDesc, mushroom_id: mushroomId}, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })}
})

router.put('/', (req, res) => {
    const cId = req.body.id;
    const cName = req.body.name;
    const cColor = req.body.color;
    const cDesc = req.body.desc;

    CookbookModel.update('id='+cId, {name: cName, color: cColor, description: cDesc}, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    CookbookModel.delete("id="+id, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })
})

module.exports = router