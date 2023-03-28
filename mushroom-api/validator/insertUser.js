const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInsertUser(data) {
    const errors = [];
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.tel = !isEmpty(data.tel) ? data.tel : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if (!Validator.isLength(data.username, {min: 5, max: 25})) {
        errors.push("用户名不合法！")
    }
    if (Validator.isEmpty(data.username)) {
        errors.push("用户名不能为空！")
    }
    if (Validator.isEmpty(data.password)) {
        errors.push("密码不能为空！")
    }
    if (!Validator.isLength(data.password, {min: 6, max: 25})) {
        errors.push("密码的长度不能小于6并且不能大于25位！")
    }
    if (Validator.isEmpty(data.tel)) {
        errors.push("电话不能为空")
    }
    if (!Validator.isLength(data.tel, {min: 11, max: 11})) {
        errors.push("电话长度不能小于11位")
    }
    if (Validator.isEmpty(data.email)) {
        errors.push("邮箱不能为空")
    }
    if (!Validator.isEmail(data.email)) {
        errors.push("邮箱错误")
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}