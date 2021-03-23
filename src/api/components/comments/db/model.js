const mongoose = require('mongoose');
const { default: mongooseAutoPopulate } = require('mongoose-autopopulate');
const { ConstructStaticMethods } = require('../../../db/plugins');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
import * as staticMethods from './methods'

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
        required: [true, 'Author is required'],
        ref: 'User',
        autopopulate: true
    },
    parent: {
        type: ObjectId,
        ref: 'Comment'
    },
    Item: {
        type: ObjectId,
        ref: 'Library.items'
    }
})


CommentSchema.plugin(require('mongoose-autopopulate'))
CommentSchema.plugin(
    ConstructStaticMethods, 
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('Comment', CommentSchema);