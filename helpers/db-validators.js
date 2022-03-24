const Role = require('../models/role');
const User = require('../models/user');
const Parking = require('../models/parking');
const Reserve = require('../models/reserve');

const isValidRole = async(rol = '') => {
    rol = rol.toLowerCase();

    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error('Invalid Role');
    }
}

const validExistEmail = async(email = '') => {

    const existEmail = await User.findOne({email});
    
    if (existEmail) {
        throw new Error('The email is already registered');
    }
}

const validUserByEmail = async(email = '') => {

    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Unregistered user');
    }
}

const validUserByID = async(id = '') =>  {

    const existUserByID = await User.findById(id);
    if ( !existUserByID ) {
        throw new Error('Invalid ID');
    }
}

const validateParkingByID = async(id = '') =>  {

    const parking = await Parking.findById(id);
    if ( !parking ) {
        throw new Error('Invalid ID');
    }
}

const validateParkingByLocation = async(location = '') => {

    const parkings = await Parking.findOne({ location });
    if (parkings) {
        return res.status(400).json({
            msg: 'Address is already registered' 
        });
    }
}

const validateReserveByID = async(id = '') => {

    const reserve = await Reserve.findById(id);

    if ( !reserve ) {
        throw new Error('Invalid ID');
    }
}

module.exports = {
    isValidRole,
    validExistEmail,
    validUserByID,
    validateParkingByID,
    validateParkingByLocation,
    validUserByEmail,
    validateReserveByID
}