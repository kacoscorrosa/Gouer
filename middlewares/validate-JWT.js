const { response } = require("express")
const admin = require('../database/firebase')

const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token must be sent'
        });
    }

    try {

        const userInfo = await admin
            .auth()
            .verifyIdToken(token);

        let user = userInfo

        if (req.url !== '/validate') {
            user = await User.findOne( {email: userInfo.email })
        }

        req.userAuth = user
        req.fbUid = userInfo.uid

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token',
            error
        });
    }
}

module.exports = {
    validateJWT
}