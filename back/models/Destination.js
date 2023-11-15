const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  totalUserRating: Number,
  rating: Number,
  openingHours: String,
  address: { type: String },
  photo: String,
  website: String,
  types: [String],
});

const destinationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  country: String,
  city: String,
  places: [placeSchema], // Embedding places within the destination schema
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;


