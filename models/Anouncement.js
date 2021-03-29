const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create schema
const AnouncementSchema = new Schema({
    
    group: {
        type: ObjectId,
        required: [true, 'Anouncement group is required'],
        ref: 'AncGroup'
    }
})

module.exports = mongoose.model('Anouncement', AnouncementSchema);