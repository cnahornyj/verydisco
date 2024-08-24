const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  comments: String,
  user_ratings_total: Number,
  rating: Number,
  openingHours: String,
  formatted_address: String,
  address_components: [
    {
      long_name: String,
      short_name: String,
      types: [String]
    }
  ],
  reviews: [
    {
      author_name: String,
      rating: Number,
      text: String,
      time: Number,
      profile_photo_url: String
    }
  ],
  photos: [String],
  website: String,
  types: [String],
});

const destinationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  country: String,
  // city: String,
  places: [placeSchema], // Embedding places within the destination schema
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;


