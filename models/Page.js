const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

// Create schema
const PageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    url: {
        type: String,
        required: [true, 'Url is required'],
        unique: true
    },
    paths: [{
        type: String
    }],
    links: [{
        name: {
            type: String
        },
        url: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Page', PageSchema);