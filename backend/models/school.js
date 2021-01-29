
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    //type: { type: String, required: true},
    adminID: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    address: { type: String, required: false },
    //arModel: { type: Number, required: false },
    images: [{
        path: { type: String, required: false }
    }]
})

module.exports = mongoose.model('school', schoolSchema)