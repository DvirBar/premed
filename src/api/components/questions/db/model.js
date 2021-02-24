const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { ConstructStaticMethods } from '../../../db/plugins'
import * as staticMethods from './methods'

// Create schema
const QuestionGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    path: {
        type: String
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
    readmore: {
        type: String
    }
})

QuestionGroupSchema.plugin(
    ConstructStaticMethods,
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('QuestionGroup', QuestionGroupSchema);