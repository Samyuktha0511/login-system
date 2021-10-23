const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name : {
        type: String, 
        default: null
    },
    last_name: {
        type: String, 
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    confirm_password: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type:String
    },
    isValid: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)