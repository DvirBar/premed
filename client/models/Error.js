const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const ErrorSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    fixed: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Error', ErrorSchema);