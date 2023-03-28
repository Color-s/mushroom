const express = require('express')
const router = express.Router()
const MushroomModel = require('../../modeles/Mushroom')


router.get('/all', (req, res) => {
    MushroomModel.find((errors, results) => {
        return res.json({data: results});
    });
})

router.get('/top10', (req, res) => {
    MushroomModel.limit({where:'tags_id=4',number:1,count:10},(err,results)=>{
        if (!err) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    });
})

router.get('/poison/top10', (req, res) => {
    MushroomModel.limit({where:'tags_id!=4',number:1,count:10},(err,results)=>{
        if (!err) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
        return;
    });
})

router.get('/allMushroom', (req, res) => {
    MushroomModel.find(['id', 'name'], (err, results) => {
        if (!err) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/allColorAndId', (req, res) => {
    MushroomModel.sql('select id, color from mushroom where tags_id = 4', (err, results) => {
        if (!err) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/poison/allColorAndId', (req, res) => {
    MushroomModel.sql('select id, color from mushroom where tags_id != 4', (err, results) => {
        if (!err) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/', (req, res) => {
    const name = req.body.name;
    const tagId = req.body.tagId;
    const classifyId = req.body.classifyId;
    const sql = 'name=\"' + name + "\"";
    MushroomModel.find(sql, (errors, results) => {
        var data = [];
        var length = results.length;
        if (tagId > 0) {
            for (let i = 0; i < length; i++) {
                if (tagId == results[i].tags_id) {
                    data.push(results[i])
                }
            }
        } else {
            data = results;
        }
        console.log(data)
        if (classifyId > 0) {
            var temp = [];
            length = data.length;
            for (let i = 0; i < length; i++) {
                if (classifyId == data[i].classify_id) {
                    temp.push(data[i])
                }
            }
            data = temp;
        }
        return res.json(data);
    return;
    });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'id=\"' + id + "\"";
    MushroomModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/:color', (req, res) => {
    const color = req.params.color;
    const sql = 'color=\"' + color + "\"";
    MushroomModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/tag/:tagId', (req, res) => {
    const tagId = req.params.tagId;
    const sql = 'tags_id=\"' + tagId + "\"";
    MushroomModel.find(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/classify/:id', (req, res) => {
    const classifyId = req.params.id;
    const sql = 'select * from mushroom where tags_id = 4 and classify_id=\"' + classifyId + "\"";
    MushroomModel.sql(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/poison/classify/:id', (req, res) => {
    const classifyId = req.params.id;
    const sql = 'select * from mushroom where tags_id != 4 and classify_id=\"' + classifyId + "\"";
    MushroomModel.sql(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/area/:id', (req, res) => {
    const areaId = req.params.id;
    const sql = 'select * from mushroom where tags_id = 4 and area_id=\"' + areaId + "\"";
    MushroomModel.sql(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

router.get('/poison/area/:id', (req, res) => {
    const areaId = req.params.id;
    const sql = 'select * from mushroom where tags_id != 4 and area_id=\"' + areaId + "\"";
    MushroomModel.sql(sql, (errors, results) => {
        if (!errors) {
            return res.json({data: results})
        } else {
            return res.json({data: []})
        }
    return;
    });
})

// router.post('/', (req, res) => {
//     const {err, isValid} = validateInsertMushroom(req.body);

//     if (!isValid) {
//         res.status(400).json(err)
//     }

//     const mName = req.body.name;
//     const mColor = req.body.color;
//     const mPhoto = req.body.photo;
//     const mDesc = req.body.desc;
//     const tagId = req.body.tagId;
//     const areaId = req.body.areaId;
//     const classifyId = req.body.classifyId;

//     MushroomModel.insert({name: mName, color: mColor, photo: mPhoto, description: mDesc, tags_id: tagId, classify_id: classifyId, area_id: areaId}, (errors, results) => {
//         if (errors == null) {
//             res.send({row: 1})
//         } else {
//             res.send({row: 0})
//         }
//     return;
//     });
// })

router.put('/', (req, res) => {
    const mId = req.body.id;
    const mName = req.body.name;
    const mColor = req.body.color;
    const mPhoto = req.body.photo;
    const mDesc = req.body.desc;
    const tagId = req.body.tagId;
    const classifyId = req.body.classifyId;

    MushroomModel.update('id='+mId, {name: mName, color: mColor, photo: mPhoto, description: mDesc, tags_id: tagId, classify_id: classifyId}, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    return;
    });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    MushroomModel.delete("id="+id, (errors, results) => {
        if (!errors) {
            return res.json({row: 1})
        } else {
            return res.json({row: 0})
        }
    return;
    });
})

module.exports = router