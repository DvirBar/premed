const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AncGroup = require('./AncGroup');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const PathSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    ancGroups: [{
        type: ObjectId,
        ref: 'AncGroup'
    }]
})

module.exports = Path = mongoose.model('path', PathSchema);