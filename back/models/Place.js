const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  totalUserRating: Number,
  rating: Number,
  openingHours: String,
  address: { type: String, required: true },
  photo: String,
  website: String,
  types: [String],
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;