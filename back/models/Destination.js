const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true},
    city: { type: String },
    description: { type: String, required: true},
    address: { type: String, required: true},
    pricelevel: { type: Number },
    placeid: { type: String, required: true}
})

module.exports = mongoose.model('Destination', destinationSchema);