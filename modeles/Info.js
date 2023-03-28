const hm = require('mysql-ithm')


const InfoModel = hm.model("info", {
    id: Number,
    user_id: Number,
    title: String,
    msg: String,
    weight: Number,
    photo: String
})

module.exports = InfoModel