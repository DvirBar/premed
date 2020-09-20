const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const UserDataSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    values: [{
        field: {
            type: ObjectId
        },
        type: {
            type: String
        },
        value: {
            type: String
        }
    }],
    paths: [{
        type: ObjectId,
        ref: 'Path'
    }],
    enabled: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now 
    }
}, { _id: false });

module.exports = mongoose.model('UserData', UserDataSchema);