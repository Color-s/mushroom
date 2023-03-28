const hm = require('mysql-ithm')


const MushroomModel = hm.model("mushroom", {
    id: Number,
    name: String,
    color: String,
    photo: String,
    description: String,
    tags_id: Number,
    classify_id: Number,
    area_id: Number
})

module.exports = MushroomModel