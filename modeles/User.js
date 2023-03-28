const hm = require('mysql-ithm')


const UserModel = hm.model("users", {
    id: Number,
    username: String,
    password: String,
    tel: String,
    email: String,
    role: Number
})

module.exports = UserModel