const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const StepSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    genContent: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    prev: {
        field: {
            type: String,
            required: true
        },
        step: {
            type: ObjectId,
            ref: 'Step',
            required: true
        },
        decription: [{
            step: {
                type: ObjectId,
                ref: 'Step',
                autopopulate: true
            },
            ratio: {
                type: Number
            }
        }]
    },
    parent: {
        type: ObjectId,
        ref: 'Step'
    }, 
    uniData: [{
        uni: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String
        },
        isFinal: {
            type: Boolean
        }
    }],
    last_edited: {
        type: Date,
        required: true,
        default: Date.now
    }   
})



StepSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Step', StepSchema);