const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

// Create schema
const UserDataSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    tables: [{
        table: {
            type: ObjectId,
            ref: 'DataTable'
        },
        paths: [{
            type: String
        }],
        enabled: {
            type: Boolean,
            default: false
        },
        dataVals: [{
            table: {
                type: ObjectId,
                ref: 'DataTable'
            },
            field: {
                type: String
            },
            group: {
                type: String
            },
            isCalc: {
                type: Boolean
            },
            value: {
                type: String
            },
            suggestValue: {
                type: String
            },
            payload: {
                type: Mixed
            }
        }],
        last_updated: {
            type: Date,
            default: Date.now 
        }
    }],
    transfer_suggested: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('UserData', UserDataSchema);