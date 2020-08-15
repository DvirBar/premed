const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const PageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    subPages: [{
        name: {
            type: String
            // Unique only for own page
        },
        links: [{
            name: {
                type: String
            },
            url: {
                type: String
            }
        }],
        url: {
            type: String,
            required: [true, 'Url is required']
            // Unique only for own page
        }
    }],
    url: {
        type: String,
        required: [true, 'Url is required'],
        unique: true
    }
})

module.exports = mongoose.model('Page', PageSchema);