const { response } = require("express")

const User = require('../models/user');

const admin = require('../database/firebase')

const getUsers = async (req, res = response) => {

    const users = await User.find({ state: true });

    res.json({
        users
    });
}

const createUser = async (req, res = response) => {

    const name = req.body.name.toLowerCase();

    const { email, password, surname } = req.body;

    try {
        const user = await admin.auth().createUser({
            email,
            password,
            displayName: `${name} ${surname}`
        });

        const userDB = new User({ name, email, surname, provider: user.providerData[0].providerId });

        await userDB.save();

        res.json(userDB);

    } catch (error) {

        console.log(error)

        res.status(400).json({
            msg: 'No se pudo crear el usuario'
        })

    }
}

const updateUser = async (req, res = response) => {

    const { id } = req.params;

    const { _id,  ...rest } = req.body;

    const user = await User.findById(id)

    if (!user) {
        res.status(400).json({})
    }

    const userDB = await User.findByIdAndUpdate(id, rest, { new: true });

    await admin.auth().updateUser(req.fbUid, {
        ...rest,
        displayName: `${req.body.name} ${req.body.surname}`
    })

    res.json(userDB)
}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(401).json({
            msg: 'Invalid ID'
        });
    }

    await admin.auth().deleteUser(req.fbUid)

    res.json({
        msg: 'Success'
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}