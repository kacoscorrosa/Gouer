const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req, res = response) => {

    const { limit, from } = req.query;
    const query = {state: true};

    let [total, users] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(from - 1))
            .limit(Number(limit))
    ]);
    
    res.status(200).json({
        total,
        users
    });
}

const createUser = async(req, res = res) => {

    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();
    const email = req.body.email.toLowerCase();
 
    const { password, role } = req.body;

    const user = new User({ name, surname, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.status(200).json({
        user
    });
}

const updateUser = async(req, res = response) => {

    const { id } = req.params;

    let { _id, email, role, name, surname, job, password, ...rest } = req.body;

    if (name) {
        rest.name = name.toLowerCase();
    }

    if (surname) {
        rest.surname = surname.toLowerCase();
    }

    if (job) {
        rest.job = job.toLowerCase();
    }

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true} );

    res.status(200).json(user);
}

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    const userAuth = req.userAuth;

    res.status(200).json({
        user,
        userAuth
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}