const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import { escapeEmptyDocsPlugin } from '../../../db/plugins';
import LibraryValidators from './validation';

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
    items: [{
        name: {
            type: String,
            required: [true, 'Item name is required']
        },
        icon: {
            type: String
        },
        link: {
            type: String,
            required: [true, 'Item link is required']
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

LibrarySchema.plugin(escapeEmptyDocsPlugin)


module.exports = mongoose.model('Library', LibrarySchema);