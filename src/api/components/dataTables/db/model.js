const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import * as staticMethods from './methods';
import { ConstructStaticMethods } from '../../../db/plugins'


// Create schema
const DataTableSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    url: {
        type: String
        // TODO: add url validation
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
        // Either accept or reject
        threshType: {
            type: String,
            enum: ['accept', 'reject']
        },
        date: {
            type: Date
            // Validate date and values are in sync
        },
        isFinal: {
            type: Boolean,
            default: false
            // Validate is final is the only one
        },
        field: {
            type: String
        },
        value: {
            type: Number
        }        
    }]
})

DataTableSchema.plugin(
    ConstructStaticMethods,
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('DataTable', DataTableSchema);