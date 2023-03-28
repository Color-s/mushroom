const hm = require('mysql-ithm')


const TagModel = hm.model("tags", {
    id: Number,
    name: String,
    color: String,
    description: String
})

module.exports = TagModel