const mongoose = require('mongoose');
const { default: mongooseAutoPopulate } = require('mongoose-autopopulate');
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
        type: ObjectId,
        ref: 'Step'
    },
    summaries: [{
        name: {
            type: String
        },
        groups: [{
            name: {
                type: String
            },
            contents: [{
                name: {
                    type: String
                },
                ratio: {
                    type: Number
                }
            }]
        }]
    }],
    linkLabel: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: 'Step'
    }, 
    uniData: [{
        uni: {
            type: String
        },
        content: {
            type: String
        },
        isFinal: {
            type: Boolean
        }
    }],
    isTransition: {
        type: Boolean
    },
    duplicate: {
        type: ObjectId,
        ref: 'Step'
    },
    last_edited: {
        type: Date,
        required: true,
        default: Date.now
    }   
})



StepSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Step', StepSchema);