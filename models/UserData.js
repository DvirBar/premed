const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
            type: ObjectId,
            ref: 'Path'
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
                type: ObjectId,
                ref: 'DataField'
            },
            value: {
                type: String
            },
            suggestValue: {
                type: String
            },
          
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