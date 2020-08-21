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
        content: {
            type: String
        },
        link: {
            name: {
                type: String
            },
            url: {
                type: String
            }
        },
        likes: {
            count: {
                type: Number,
                default: 0
            },
            users: [{
                type: ObjectId,
                ref: "User"
            }]
        }
    }],
    url: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: "Topic"
    },
    subpage: {
        type: ObjectId,
        required: [true, 'Page is required'],
        ref: 'Page'
    }  
})

module.exports = mongoose.model('Topic', TopicSchema);