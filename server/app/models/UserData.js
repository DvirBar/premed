const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;
import * as staticMethods from '../src/api/components/stats/userData/db/methods'
import { ConstructStaticMethods } from '../src/api/db/plugins';

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
            field: {
                type: String
            },
            cusGroupParent: {
                type: String
            },
            isCalc: {
                type: Boolean
            },
            value: {
                type: Mixed
            },
            otherValue: {
                value: {
                    type: Number
                },
                year: {
                    type: Number
                }
            },
            suggestValue: {
                type: String
            },
            suggestedAccepted: {
                type: Boolean
            },
            payload: {
                type: Mixed
            }
        }],
        groupVals: [{
            field: {
                type: String
            },
            group: {
                type: String
            },
            cusGroupParent: {
                type: String
            },
            isType: {
                type: Boolean
            },
            value: {
                type: String
            }
        }],
        customGroups: [{
            name: {
                type: String
            },
            cusGroupParent: {
                type: String
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

UserDataSchema.plugin(
    ConstructStaticMethods, 
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('UserData', UserDataSchema);