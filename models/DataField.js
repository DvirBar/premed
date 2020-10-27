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
    dataType: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    },
    fieldOptions: [{
        type: String
    }],
    path: {
        type: ObjectId,
        ref: 'Path'
    },
    group: {
        type: ObjectId,
        ref: 'DataGroup' 
    },
    university: {
        type: ObjectId,
        ref: 'University'
    },
    role: {
        type: String
    },
    calcOutput: {
        storedCalc: {
            type: String
        },
        isSuggestion: {
            type: Boolean
        }
    }
})

module.exports = mongoose.model('DataField', DataFieldSchema);