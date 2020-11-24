const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const StepSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    content: {
        type: String
    },
    prev: {
        type: ObjectId,
        ref: 'Step'
    },
    parent: {
        type: ObjectId,
        ref: 'Step'
    },
    path: {
        type: String
    },
    author: {
        type: ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    last_edited: {
        type: Date,
        default: Date.now
    }   
})

module.exports = mongoose.model('Step', StepSchema);