const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid email'
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'inactive user'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid password'
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
            msg: 'communicate with the administrator',
            error
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, picture, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            const data = {
                name,
                email,
                password: ':p',
                google: true,
            };

            user = new User( data );
            await user.save();
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg:'The token could not be verified',
            error
        })

    }
}

module.exports = {
    login,
    googleSignIn
}