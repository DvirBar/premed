const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import LibraryValidators from './validation';
import * as staticMethods from './methods';
import { ConstructStaticMethods } from '../../../db/plugins';

// Create schema
const LibrarySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    info: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: 'Library',
        validate: {
            validator: LibraryValidators.parent,
            message: 'Cannot find parent library'
        }
    },
    paths: [{
        type: String,
        required: [true, 'At least one path is required']
    }],
    items: [{
        name: {
            type: String,
            required: [true, 'Item name is required']
        },
        icon: {
            type: String,
            required: [true, 'Link is required']
        },
        link: {
            type: String,
            required: [true, 'Item link is required']
        },
        info: {
            type: String
        },
        meta: {
            credit: {
                type: String
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        },
        upvotes: [{
            type: ObjectId,
            ref: "User"
        }],
        downvotes: [{
            type: ObjectId,
            ref: "User"
        }]
    }]
})

LibrarySchema.plugin(
    ConstructStaticMethods,  
    { customStaticMethods: staticMethods })


module.exports = mongoose.model('Library', LibrarySchema);