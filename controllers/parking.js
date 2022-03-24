const { response } = require("express")

const Parking = require('../models/parking');

const getParkings = async(req, res = response) => {

    const { limit, from } = req.query;

    let [total, parkings] = await Promise.all([
        Parking.count(),
        Parking.find()
            .skip(Number(from - 1))
            .limit(Number(limit))
    ]);
    
    res.status(200).json({
        total,
        parkings
    });
}

const createParking = async(req, res = response) => {

    const name = req.body.name.toLowerCase();
    
    const { location, place, horary, price } = req.body;

    const parkings = await Parking.findOne({ location });
    if (parkings) {
        return res.status(400).json({
            msg: 'Address is already registered' 
        });
    }

    const park = new Parking({ name, location, place, horary, price });
    
    await park.save();
    
    res.json(park);
}

const updateParking = async(req, res = response) => {

    const { id } = req.params;
    const { _id, location, ...rest } = req.body;

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