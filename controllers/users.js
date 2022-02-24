const { response } = require("express")

const getUsers = (req, res = response) => {

    const { limit = 5, from = 1 } = req.query;

    res.json({
        query
    })
}

const createUser = (req, res = response) => {

    const body = req.body;

    res.json({
        body
    })
}

const updateUser = (req, res = response) => {

    const id = req.params.id;

    res.json({
        id
    })
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'DELETE'
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}