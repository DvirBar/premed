import mongoose from 'mongoose'
import { ConstructStaticMethods } from '../../../db/plugins';
const Schema = mongoose.Schema;
import * as staticMethods from './methods'
import { authPreSave } from './middlewares';

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
    failedAttempts: {
        type: Number,
        default: 0
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
        // Password validation
    },
    formerPasswords: [{
        type: String
    }],
    blocked: {
        isBlocked: {
            type: Boolean
        },
        expiry: {
            type: Date
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    passwordReset: {
        count: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        }
    }
})

// Middlewares
UserSchema.pre('save', authPreSave)

// Define static methods
UserSchema.plugin(
    ConstructStaticMethods, 
    { customStaticMethods: staticMethods })

export default mongoose.model('User', UserSchema)