const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { ConstructStaticMethods } from '../../../db/plugins'
import * as staticMethods from './methods'

// Create schema
const QuestionsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    path: [{
        type: String
    }],
    questions: [{
        question: {
            type: String,
            required: [true, "Question is required"]
        },
        answer: {
            type: String,
            required: [true, "Answer is required"]
        },
        sourceLink: {
            type: String
        }
    }],
    readmore: {
        type: String
    }
})

QuestionsSchema.plugin(
    ConstructStaticMethods,
    { customStaticMethods: staticMethods })

module.exports = mongoose.model('Questions', QuestionsSchema);