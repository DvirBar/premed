const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import { ConstructStaticMethods } from '../../../../db/plugins';
import * as staticMethods from './methods';
import Path from '../../../../../staticData/baseData/Path'
import { subTypes } from './enums';
const path = new Path()

// Create schema
const AncGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    path: {
        type: String,
        required: [true, 'Path is required'],
        enum: path.getPaths()
    },
    subscribers: [{
        user: {
            type: ObjectId, 
            required: [true, 'User is required'],
            ref: 'User'
        },
        types: [{
            type: String,
            required: [true, 'Subscription type is required'],
            enum: Object.values(subTypes)
        }]
    }],
    announcements: [{
        type: ObjectId,
        ref: 'Announcement'
    }]
})

AncGroupSchema.post('remove',  async function(doc, next) {
    const children = await this.model('Announcement').find({ group: doc._id })
    for(let child of children) {
        child.remove()
    }
    
    next()
})

AncGroupSchema.plugin(
    ConstructStaticMethods,  
    { customStaticMethods: staticMethods })


module.exports = mongoose.model('AncGroup', AncGroupSchema);