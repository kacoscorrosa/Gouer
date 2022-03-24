const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validUserByEmail } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( validUserByEmail ),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;