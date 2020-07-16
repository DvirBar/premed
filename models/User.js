const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
        // Email validation
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
        // Password validation
    },
    prefs: [{
        name: {
            type: String
            // Validate name
        },
        value: {
            type: String
            // Validate value (with associated name)
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);