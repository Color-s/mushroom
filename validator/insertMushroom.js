const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInsertMushRoom(data) {
    const errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.color = !isEmpty(data.color) ? data.color : '';
    data.photo = !isEmpty(data.photo) ? data.photo : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';
    data.tagId = !isEmpty(data.tagId) ? data.tagId : '';
    data.classifyId = !isEmpty(data.classifyId) ? data.classifyId : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = "名称不能为空！"
    }
    if (!Validator.isHexColor(data.color)) {
        errors.color = "颜色不正确"
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}