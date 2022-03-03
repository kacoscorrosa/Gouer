const { Schema, model } = require('mongoose');

const ParkingSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        unique: true
    },
    place: {
        type: Number,
        required: [true, 'Place is required'] 
    },
    state: {
        type: Boolean,
        default: true
    },
    horary: {
        type: String,
        required: true 
    },
    price: {
        type: String,
        default: '0'
    },
});

ParkingSchema.methods.toJSON = function() {
    const { __v, _id, ...parking } = this.toObject();
    parking.uid = _id;

    return parking;
}

module.exports = model( 'Parking', ParkingSchema ); 