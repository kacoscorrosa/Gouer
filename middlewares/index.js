const validateFields = require('../middlewares/validate-fields');
const validateToken = require('./validate-Token');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateFields,
    ...validateToken,
    ...validateRoles
}