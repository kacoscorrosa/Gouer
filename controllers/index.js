const auth = require('./auth');
const parking = require('./parking');
const reserve = require('./reserve');
const users = require('./users');

module.exports = {
    ...auth,
    ...parking,
    ...reserve,
    ...users
}