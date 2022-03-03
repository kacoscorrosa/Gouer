const { Schema, model } = require('mongoose');

const ReserveSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: 'Parking'
    },
    create: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    }
});

ReserveSchema.methods.toJSON = function() {
    const { __v, _id, ...reserve } = this.toObject();
    reserve.uid = _id;

    return reserve;
}

module.exports = model( 'Reserve', ReserveSchema ); 