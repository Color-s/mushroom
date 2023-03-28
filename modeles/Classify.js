const hm = require('mysql-ithm')


const ClassifyModel = hm.model("classify", {
    id: Number,
    name: String,
    color: String,
    description: String
})

module.exports = ClassifyModel