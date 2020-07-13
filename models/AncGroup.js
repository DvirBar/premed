const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Path = require('./Path');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const AncGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    subscribers: [{
        userId: {
            type: ObjectId, 
            ref: 'User'
        }
    }],
    pathId: {
        type: ObjectId,
        ref: 'Path'
    }
})

module.exports = AncGroup = mongoose.model('ancgroup', AncGroupSchema);