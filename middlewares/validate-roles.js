const { response } = require("express");

const User = require('../models/user');

const validateRoleAuth = async(req, res = response, next) => {

    if ( !req.userAuth ) {
        return res.status(500).json({
            msg: 'Token must be validated first'
        });
    }

    const { rol, name, id:idAuth } = req.userAuth;
    
    const { id } = req.params;

    if ( rol !== 'admin_role' && id !== idAuth ) {

        return res.status(401).json({
            msg: `${ name } not authorized to delete user`
        });
    }

    next();
}

const isAdminRole = async(req, res = response, next) => {

    if ( !req.userAuth ) {
        return res.status(500).json({
            msg: 'Token must be validated first'
        });
    }

    const { rol, name } = req.userAuth;

    if ( rol !== 'admin_role' ) {

        return res.status(401).json({
            msg: `${ name } not authorized to delete user`
        });
    }

    next();
}

module.exports = {
    validateRoleAuth,
    isAdminRole
}