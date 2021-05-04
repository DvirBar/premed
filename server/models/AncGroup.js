const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const AncGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    path: {
        type: String
    },
    subscribers: [{
        userId: {
            type: ObjectId, 
            ref: 'User'
        }
    }],
})

module.exports = mongoose.model('AncGroup', AncGroupSchema);