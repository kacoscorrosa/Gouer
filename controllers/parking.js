const { response } = require("express")
const bcryptjs = require('bcryptjs');

const Parking = require('../models/parking');

const getParkings = async(req, res = response) => {

    const parking = await Parking.find();

    res.json({
        parking
    });
}

const createParking = async(req, res = response) => {

    const name = req.body.name.toLowerCase();
    
    const { location, place, horary, price, rol } = req.body;

    const parkings = await Parking.findOne({ location });
    if (parkings) {
        return res.status(400).json({
            msg: 'Address is already registered' 
        });
    }

    const park = new Parking({ name, location, place, horary, price, rol });
    
    await park.save();
    
    res.json(park);
}

const updateParking = async(req, res = response) => {

    const { id } = req.params;
    const { _id, rol, ...rest } = req.body;
    const { location } = req.body;

    const parkings = await Parking.findOne({ location });
    if (parkings) {
        return res.status(400).json({
            msg: 'Address is already registered' 
        });
    }

    const parkingsAct = await Parking.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        parkingsAct
    });
}

const deleteParking = async(req, res = response) => {

    const { id } = req.params;

    const parkings = await Parking.findByIdAndDelete( id );

    if ( !parkings ) {
        return res.status(401).json({
            msg: 'Invalid ID'
        });
    }

    const userAuth = req.userAuth;

    res.json({
        deleted: parkings,
        userAuth
    });
}

module.exports = {
    getParkings,
    createParking,
    updateParking,
    deleteParking
}