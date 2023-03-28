const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    const errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.username, {min: 5, max: 25})) {
        errors.username = "用户名不合法！"
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = "用户名不能为空！"
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "密码不能为空！"
    }
    if (!Validator.isLength(data.password, {min: 2, max: 30})) {
        errors.password = "密码的长度不能小于2并且不能大于30位！";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}