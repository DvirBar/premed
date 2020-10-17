const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const TopicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String
    },
    items: [{
        name: {
            type: String
        },
        icon: {
            type: String
        },
        link: {
            type: String
        },
        upvotes: [{
            type: ObjectId,
            ref: "User"
        }],
        downvotes: [{
            type: ObjectId,
            ref: "User"
        }],
        comments: [{
            text: {
                type: String
            },
            author: {
                type: ObjectId,
                ref: "User"
            },
            parent: {
                type: ObjectId,
                ref: "Topic.comments"
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [{
                type: ObjectId,
                ref: 'User'
            }]
        }]
    }],
    url: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: "Topic"
    },
    page: {
        type: ObjectId,
        required: [true, 'Page is required'],
        ref: 'Page'
    }  
})

module.exports = mongoose.model('Topic', TopicSchema);