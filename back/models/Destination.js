const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  country: { type: String, required: true },
  city: String,
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }], // Using references
  //TODO: Adding place Schema directly here rather than using references
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;