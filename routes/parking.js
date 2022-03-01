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

const { getParkings, createParking, updateParking, deleteParking } = require('../controllers/parking');

const router = Router();

router.get('/', [
    validateJWT,
    isAdminRole
], getParkings );

router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'Name is requerid').not().isEmpty(),
    check('location', 'Location is requerid').not().isEmpty(),
    check('place', 'Place is requerid').not().isEmpty(),
    check('place', 'Place must be a number').isNumeric(),
    check('horary', 'Horary is requerid').not().isEmpty(),
    validateFields
], createParking );

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateParkingByID ),
    validateFields
], updateParking );

router.delete('/:id', [
    validateJWT,
    validateRoleAuth,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateParkingByID ),
    validateFields
], deleteParking );

module.exports = router;