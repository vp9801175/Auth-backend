const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String 
    },
    token: { 
        type: String 
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User