const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const CalculationSchema = new Schema({
    name: {
        type: String
    },
    prevCals: [{
        type: ObjectId,
        ref: 'Calculation'
    }],
    fields: [{
        type: ObjectId,
        ref: 'DataField'
    }],
    university: {
        type: ObjectId,
        ref: 'University'
    },
    path: {
        type: ObjectId,
        ref: 'Path'
    },
    calc: {
        type: String
    },
    isExternal: {
        type: Boolean
    }
})

module.exports = mongoose.model('Calculation', CalculationSchema);