const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const DataTableSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    year: {
        type: Number
    },
    sheetId: {
        type: String
    },
    data_created: {
        type: Date,
        default: Date.now
    },
    enabled: { // If true, data will flow to this sheet
        type: Boolean,
        default: false
    },
    locked: { 
    /* If true, users cannot insert data to the 
    spreadsheet, all disabled sheets are locked */
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('DataTable', DataTableSchema);