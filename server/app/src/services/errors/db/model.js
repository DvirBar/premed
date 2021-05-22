const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ErrorHandlerSchema = new Schema({
    title: {
        type: String
    },
    request: {
        url: {
            type: String
        },
        method: {
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('ErrorHandler', ErrorHandlerSchema);