const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const InquirySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    refLink: { 
        type: String
    },
    statuses: [{
        value: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean
        },
        note: {

        },
        admin: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    sent: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Inquiry', InquirySchema);