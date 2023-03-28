const hm = require('mysql-ithm')


const CookbookModel = hm.model("cookbook", {
    id: Number,
    mushroom_id: Number,
    name: String,
    type: String,
    description: String
})

module.exports = CookbookModel