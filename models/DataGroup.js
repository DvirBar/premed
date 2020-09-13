const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const DataGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    path: {
        type: ObjectId,
        ref: 'Path'
    },
    parent: {
        type: ObjectId,
        ref: 'Group'
    },
    role: {
        type: String
    }
})

module.exports = mongoose.model('DataGroup', DataGroupSchema);