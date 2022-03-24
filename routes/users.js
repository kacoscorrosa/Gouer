const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        isAdminRole,
        validateRoleAuth} = require('../middlewares');

const { validExistEmail,
        validUserByID } = require('../helpers/db-validators');

const { getUsers,
        createUser,
        updateUser, 
        deleteUser} = require('../controllers');

const router = Router();

router.get( '/', [
    validateJWT,
    isAdminRole,
], getUsers );

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(validExistEmail),
    check('password', 'The password must contain a minimum of 6 digits').isLength({ min: 6 }),
    check('rol', 'Role is required').not().isEmpty(),
    check('rol').isIn(['user_role']),
    validateFields
], createUser );

router.put('/:id', [
    validateJWT,
    validateRoleAuth,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validUserByID),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    validateRoleAuth,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validUserByID),
    validateFields
], deleteUser);

module.exports = router;