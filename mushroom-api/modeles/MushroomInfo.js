const hm = require('mysql-ithm')


const MushroomInfoModel = hm.model("mushroomInfo", {
    id: Number,
    name: String,
    color: String,
    photo: String,
    description: String,
    tag: String,
    classify: String,
    area: String
})

module.exports = MushroomInfoModel