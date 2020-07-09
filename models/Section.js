const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const SectionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    index: {
        type: Number, 
        required: [true, 'Index is required']
    },
    items: [{
        name: {
            type: String
        },
        content: {
            type: String
        },
        index: {
            type: Number
        }
    }],
    userId: {
        type: ObjectId,
        required: [true, 'User id is required'],
        ref: User
    }   
})

module.exports = Section = mongoose.model('section', SectionSchema);