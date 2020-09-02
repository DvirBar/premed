const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const DataFieldSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    validators: [{
        validType: {
            type: String
        },
        min: {
            type: Number
        },
        max: {
            type: Number
        }
    }],
    fieldType: {
        type: String
    },
    fieldOptions: [{
        name: {
            type: String
        },
        value: {
            type: String
        }
    }],
    group: {
        type: ObjectId,
        ref: 'DataGroup'
    },
})

module.exports = mongoose.model('DataField', DataFieldSchema);