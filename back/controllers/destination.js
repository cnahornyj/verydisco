const Destination = require("../models/Destination");

//* Retrieves all destinations of a user
exports.getAllDestinations = async (req, res, next) => {
  try {
    // Get the user's ID from req.auth (assuming it's set by your authentication middleware)
    const userId = req.auth.userId;

    // Find all destinations for the user with the matching userId
    const destinations = await Destination.find({ userId });

    // Respond with the list of destinations
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error retrieving destinations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//* Retrieves a specific destination of a user
exports.getDestination = async (req, res, next) => {
  try {
    // Get the user's ID from req.auth (assuming it's set by your authentication middleware)
    const userId = req.auth.userId;

    // Get the destination ID from the route parameter
    const destinationId = req.params.id;

    // Find the destination for the user with the matching userId and destinationId
    const destination = await Destination.findOne({
      userId,
      _id: destinationId,
    });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    // Respond with the specific destination
    res.status(200).json(destination);
  } catch (error) {
    console.error("Error retrieving destination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { country, city } = req.body;
    const newDestination = await Destination.create({ userId, country, city });
    res.status(201).json(newDestination);
  } catch (error) {
    console.error('Create Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addPlacesToDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { places } = req.body;

    // Find the destination by ID
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Add places to the destination
    destination.places.push(...places);
    await destination.save();

    res.status(200).json(destination);
  } catch (error) {
    console.error('Add Places to Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//* works without passing the userId directly in the request but with the token
exports.updatePlaceInDestination = async (req, res) => {
  try {
    const { destinationId, placeId } = req.params;
    // console.log(`Destination ID: ${destinationId}`);
    // console.log(`Place ID: ${placeId}`);
    // console.log('Request Body:', req.body);

    // Find the destination by ID
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Find the place within the destination's places array
    const placeToUpdate = destination.places.id(placeId);

    if (!placeToUpdate) {
      return res.status(404).json({ error: 'Place not found in the destination' });
    }

    // Update the place with new data from the request body
    const { userId, name, description, comments, totalUserRating, rating, openingHours, address, photos, website, types } = req.body;

    // Check and update only the fields that are present in the request body
    if (name !== undefined) placeToUpdate.name = name;
    if (description !== undefined) placeToUpdate.description = description;
    if (comments !== undefined) placeToUpdate.comments = comments;
    if (totalUserRating !== undefined) placeToUpdate.totalUserRating = totalUserRating;
    if (rating !== undefined) placeToUpdate.rating = rating;
    if (openingHours !== undefined) placeToUpdate.openingHours = openingHours;
    if (address !== undefined) placeToUpdate.address = address;
    if (photos !== undefined) placeToUpdate.photos = photos;
    if (website !== undefined) placeToUpdate.website = website;
    if (types !== undefined) placeToUpdate.types = types;

    // Save the updated destination
    await destination.save();

    res.status(200).json(destination);
  } catch (error) {
    console.error('Update Place in Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//* works without passing the userId directly in the request but with the token
exports.deletePlaceFromDestination = async (req, res) => {
  try {
    const { destinationId, placeId } = req.params;

    // Find the destination by ID
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Remove the place from the array using pull
    destination.places.pull({ _id: placeId });

    // Save the updated destination
    await destination.save();

    res.status(200).json(destination);
  } catch (error) {
    console.error('Delete Place from Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};














