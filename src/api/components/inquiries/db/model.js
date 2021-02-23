const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema
import { findKeyByNestedValue } from '../../../../../utils/objects';
import { 
    statusTypes, 
    inquiryTypes 
} from '../allowedTypes'
import { CostructStaticMethods } from '../../../db/plugins'
import * as staticMethods from './methods'

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
        required: true,
        enum: Object.keys(inquiryTypes)
    },
    refLink: { 
        type: String
    },
    statuses: [{
        type: {
            type: String,
            enum: Object.keys(statusTypes),
            default: findKeyByNestedValue(statusTypes, 'default', true)
        },
        date: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean
        },
        note: {
            type: String
        },
        admin: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    assignedAdmin: {
        type: ObjectId,
        ref: 'User'
    },
    sent: {
        type: Date,
        default: Date.now
    }
}, { modelName: 'inquiry' })

InquirySchema.plugin(
    CostructStaticMethods, 
    { customStaticMethods: staticMethods})

module.exports = mongoose.model('Inquiry', InquirySchema);