const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

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
    },
    thresholds: [{
        // Either acceptance or rejection
        threshType: {
            type: String
        },
        date: {
            type: Date
        },
        isFinal: {
            type: Boolean,
            default: false
        },
        field: {
            type: ObjectId,
            ref: 'DataField'
        },
        value: {
            type: Number
        }        
    }]
})

module.exports = mongoose.model('DataTable', DataTableSchema);