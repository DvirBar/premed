const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import { ConstructStaticMethods } from '../../../../db/plugins';
import * as staticMethods from './methods';

// Create schema
const AnnouncementSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String, 
        required: [true, 'Content is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    group: {
        type: ObjectId,
        ref: 'AncGroup'
    }
})

AnnouncementSchema.plugin(
    ConstructStaticMethods,  
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('Announcement', AnnouncementSchema);