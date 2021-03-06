const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {

        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById(uid);

        if ( !user ) {
            return res.status(401).json({
                msg: 'Invalid Token'
            });
        }

        req.userAuth = user;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        });        
    }

}

module.exports = {
    validateJWT
}