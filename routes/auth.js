const { Router } = require('express');
const { check } = require('express-validator');

const { validate } = require('../controllers/auth');
const { validateJWT } = require('../middlewares');

const router = Router();

router.get('/validate', validateJWT, validate );

router.post('/')

module.exports = router;