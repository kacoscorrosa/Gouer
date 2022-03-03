const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT,
        isAdminRole,
        validateRoleAuth } = require('../middlewares');

const { isValidRole,
        validEmail,
        validateUserByID, 
        validateParkingByID,
        validateParkingByLocation} = require('../helpers/db-validators');

const { getReserves, createReserve, deleteReserve } = require('../controllers/reserve');

const router = Router();

router.get('/', [
    validateJWT,
], getReserves );

router.post('/', [
    validateJWT,
    check('parking', 'Parking is requerid').not().isEmpty(),
    check('parking', 'Invalid Parking ID').isMongoId(),
    validateFields
], createReserve );

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    validateFields
], deleteReserve );

module.exports = router;