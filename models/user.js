const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'user_role'
    },
    state: {
        type: Boolean,
        default: true
    },
    suscription: {
        type: String,
    },
    provider: {
        type: String,
        required: true
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, state, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
}

module.exports = model( 'User', UserSchema ); 

