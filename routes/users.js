const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole,
        validEmail,
        validateUserByID } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const { getUsers,
        createUser,
        updateUser,
        deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers );

router.post('/', [
    check('name', 'Name is requerid').not().isEmpty(),
    check('email', 'Email is requerid').not().isEmpty(),
    check('email').custom( validEmail ),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must contain at least 6 digits').isLength({ min: 6 }),
    check('rol').custom( isValidRole ),
    validateFields
], createUser );

router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateUserByID ),
    check('rol').custom( isValidRole ),
    validateFields
], updateUser );

router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateUserByID ),
    validateFields
], deleteUser );

module.exports = router;