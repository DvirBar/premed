const mongoose = require('mongoose');
const { ConstructStaticMethods } = require('../../../db/plugins');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import * as staticMethods from './methods'
import { commentPreSave, commentPostRemove } from './middlewares';

// Create schema
const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: ObjectId,
        required: [true, 'User is required'],
        ref: 'User',
        autopopulate: true
    },
    item: {
        type: ObjectId, 
        required: true,
        ref: 'Library.items'
    }, 
    parent: {
        type: ObjectId,
        ref: 'Comment'
    }
})


CommentSchema.pre('save', commentPreSave)
CommentSchema.post('remove', commentPostRemove)

CommentSchema.plugin(require('mongoose-autopopulate'))
CommentSchema.plugin(
    ConstructStaticMethods, 
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('Comment', CommentSchema);