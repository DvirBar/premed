const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const QuestionGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    path: {
        type: ObjectId,
        ref: 'Path'
    },
    questions: [{
        question: {
            type: String
        },
        answer: {
            type: String
        },
        sourceLink: {
            type: String
        }
    }],
    read_more: {
        type: String
    }

})

module.exports = mongoose.model('QuestionGroup', QuestionGroupSchema);