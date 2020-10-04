const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DataTableSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    url: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    enabled: { 
        /* If true, data will flow to this sheet, 
        only one sheet can be enabled at a time */
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('DataTable', DataTableSchema);