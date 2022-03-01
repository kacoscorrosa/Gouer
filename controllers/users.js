const { response } = require("express")
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req, res = response) => {

    const users = await User.find({ state: true });

    res.json({
        users
    });
}

const createUser = async(req, res = response) => {

    const name = req.body.name.toLowerCase();
    const rol = req.body.rol.toLowerCase();
    
    const { email, password, surname } = req.body;

    const user = new User({ name, email, password, rol, surname });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();
    
    res.json(user);
}

const updateUser = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        user
    });
}

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete( id );

    if ( !user ) {
        return res.status(401).json({
            msg: 'Invalid ID'
        });
    }

    const userAuth = req.userAuth;

    res.json({
        deletedUser: user,
        userAuth
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}