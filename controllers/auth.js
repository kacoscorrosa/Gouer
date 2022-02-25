const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');
const { generateJWT } = require("../helpers/generateJWT");

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json({
                msg: 'Invalid email'
            });
        }

        if ( !user.state ) {
            return res.status(400).json({
                msg: 'inactive user'
            });
        }
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'communicate with the administrator',
            error
        });
    }
}

module.exports = {
    login
}