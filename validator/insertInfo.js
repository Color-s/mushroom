const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInsertInfo(data) {
    const errors = {};
    data.userId = !isEmpty(data.userId) ? data.userId : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.msg = !isEmpty(data.msg) ? data.msg : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = "标题不能为空！"
    }
    if (data.userId < 1) {
        errors.userId = "用户id不能为空"
    }
    if (Validator.isEmpty(data.msg)) {
        errors.msg = "公告内容不能为空"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}