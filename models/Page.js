const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const PageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    links: [{
        name: {
            type: String
        },
        url: {
            type: String
        }
    }],
    navParent: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        required: [true, 'Url is required'],
        unique: true
    }
})

module.exports = mongoose.model('Page', PageSchema);