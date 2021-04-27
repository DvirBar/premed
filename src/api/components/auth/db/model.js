import mongoose from 'mongoose'
import { ConstructStaticMethods } from '../../../db/plugins';
const Schema = mongoose.Schema;
import * as staticMethods from './methods'

// Create schema
export const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    isStudent: {
        status: {
            type: Boolean,
            default: false
        },
        isPending: {
            type: Boolean,
            default: false
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
        // Email validation
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
        // Password validation
    },
    prefs: [{
        name: {
            type: String
            // Validate name
        },
        value: {
            type: String
            // Validate value (with associated name)
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

// Define static methods
UserSchema.plugin(
    ConstructStaticMethods, 
    { customStaticMethods: staticMethods })

export default mongoose.model('User', UserSchema)