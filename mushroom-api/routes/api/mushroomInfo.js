const express = require('express');
const MushroomInfoModel = require('../../modeles/MushroomInfo');
const router = express.Router()


router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'id=\"' + id + "\"";
    MushroomInfoModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
        return;
    });
})

module.exports = router