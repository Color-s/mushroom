const mysql = require('mysql');
const express = require('express')
const router = express.Router()

const validateInsertMushroom = require('../../validator/insertMushroom')

router.post('/', (req, res) => {
    const { errors, isValid } = validateInsertMushroom(req.body);

    if (!isValid) {
        console.log('出错了，err: ', errors)
    } else {
        const mName = req.body.name;
        const mColor = req.body.color;
        const mPhoto = req.body.photo;
        const mDesc = req.body.desc;
        const tagId = req.body.tagId;
        const areaId = req.body.areaId;
        const classifyId = req.body.classifyId;
        const connection = mysql.createConnection({
            host: '39.105.231.106',
            user: 'root',
            password: '091816',
            port: '3306',
            database: 'mushroom'
        });
        connection.connect();

        var addSql = 'INSERT INTO mushroom(name,color,photo,description,tags_id,area_id,classify_id) VALUES(?,?,?,?,?,?,?)';
        var addSqlParams = [mName, mColor, mPhoto, mDesc, tagId, areaId, classifyId];

        //增
        connection.query(addSql, addSqlParams, function (err, results) {
            if (err == null) {
                return res.send({ row: results })
            } else {
                return res.send({ row: results })
            }
            return;
        });

        connection.end();
    }
});


module.exports = router