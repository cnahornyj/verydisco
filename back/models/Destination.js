const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({

    country: { type: String, required: true },
    city: { type: String },
    places: [
        {
            place_id: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String },
            address: { type: String, required: true },
            opening_hours: { type: [String] },
            //photos: { type: ArrayBuffer },
            website: { type: String },
            rating: { type: Number },
            user_ratings_total: { type: Number },
            reviews: { type: [Object] },
            types: { type: [String] },
        }
    ]
})

module.exports = mongoose.model('Destination', destinationSchema);