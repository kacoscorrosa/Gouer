const Parquing = require('../models/parking');
const Role = require('../models/role');
const User = require('../models/user');

module.exports = {
    ...Parquing,
    ...Role,
    ...User
}