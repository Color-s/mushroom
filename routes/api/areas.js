const express = require('express')
const router = express.Router()
const AreaModel = require('../../modeles/Areas')

router.get('/all', (req, res) => {
    AreaModel.find((errors, results) => {
        return res.json({data: results})
    })
})

router.get('/', (req, res) => {
    const name = req.query.name;
    const sql = 'name=\"' + name + "\"";
    AreaModel.find(sql, (errors, results) => {
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
    AreaModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    })
})

router.post('/', (req, res) => {
    
    const cName = req.body.name;
    const cCoordinate = req.body.coordinate;

    AreaModel.insert({name: cName, coordinate: cCoordinate}, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })
})

router.put('/', (req, res) => {
    const cId = req.body.id;
    const cName = req.body.name;
    const cCoordinate = req.body.coordinate;

    AreaModel.update('id='+cId, {name: cName, coordinate: cCoordinate}, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    AreaModel.delete("id="+id, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    })
})

module.exports = router