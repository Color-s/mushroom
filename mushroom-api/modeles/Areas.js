const hm = require('mysql-ithm')


const AreaModel = hm.model("areas", {
    id: Number,
    name: String,
    coordinate: JSON
})

module.exports = AreaModel