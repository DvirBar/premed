const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const UniversitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    color: {
        type: String
    },
    paths: [{
        type: ObjectId,
        ref: 'Path'
    }]
})

module.exports = mongoose.model('University', UniversitySchema);