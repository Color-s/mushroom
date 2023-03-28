const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInsertCookbook(data) {
    const errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = "名称不能为空！"
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}