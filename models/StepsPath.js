const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const StepsPathSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    uni: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    steps: [{
        step: {
            type: ObjectId,
            ref: 'Step',
            autopopulate: true
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
        content: {
            type: String
        },
        isFinal: {
            type: Boolean
        }
    }]
})

StepsPathSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('StepsPath', StepsPathSchema);