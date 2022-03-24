const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT } = require('../middlewares');

const { validateParkingByID,
        validateReserveByID} = require('../helpers/db-validators');

const { getReserves,
        createReserve,
        deleteReserve } = require('../controllers/reserve');

const router = Router();

router.get('/', [
    validateJWT,
], getReserves );

router.post('/', [ 
    validateJWT,
    check('parking', 'Parking is requerid').not().isEmpty(),
    check('parking', 'Invalid Parking ID').isMongoId(),
    check('parking').custom(validateParkingByID),
    validateFields
], createReserve );

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateReserveByID),
    validateFields
], deleteReserve );

module.exports = router;