const { response } = require("express");

const Reserve = require('../models/reserve');

const getReserves = async(req, res = response) => {

    const { id, rol, name } = req.userAuth;
    const reserve = await Reserve.find({user: id});
    console.log(reserve);

    if ( rol === 'admin_role' ) {

        const reserve = await Reserve.find()
                                .populate('user', 'name')
                                .populate('parking', 'name location');

        return res.json({
            reserve
        });

    } else if ( rol !== 'admin_role' ) {

        const authUserReserv = await Reserve.find({user: id})
                                        .populate('user', 'name')
                                        .populate('parking', 'name location');

        if (authUserReserv.length === 0) {
            return res.status(400).json({
                msg: `${name} has no reservations`
            })
        }

        return res.json({
            authUserReserv
        });
        
    } else {
        res.status(400).json({
            msh: `${ name } is not authorized`
        })
    }
}

const createReserve = async(req, res = response) => {
    
    const { parking } = req.body;

    const data = {
        user: req.userAuth._id,
        parking,
    }

    const reser = new Reserve( data );
    
    await reser.save();
    
    res.json(reser);
}

const deleteReserve = async(req, res = response) => {

    const { id } = req.params;

    const reserv = await Reserve.findById(id);

    const userReserv = reserv.user.toString();

    const { name, rol, id:idAuth } = req.userAuth;

    if ( rol !== 'admin_role' && userReserv !== idAuth ) {
        return res.status(400).json({
            msg: `${name} does not have access to this`
        });
    }

    const reserve = await Reserve.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({
        reserve
    });
}

module.exports = {
    getReserves,
    createReserve,
    deleteReserve
}