const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    try {

        const user = await User.findOne({ email });

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid email/password'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: 'Communicate with the administrator',
            error
        });
    }
}

module.exports = {
    login
}