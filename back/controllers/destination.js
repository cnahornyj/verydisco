const Destination = require("../models/Destination");
const Place = require("../models/Place");

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

//* Creates a destination with ou without associated places
exports.createDestination = async (req, res) => {
  try {
    const { userId } = req.auth; // Assuming userId is set by authentication middleware
    const { country, city, places } = req.body;

    // Create a new destination with the provided data
    const newDestination = await Destination.create({
      userId,
      country,
      city,
    });

    // If places are provided, associate them with the new destination
    if (places && places.length > 0) {
      const placeIds = await Place.insertMany(places.map(place => ({ destinationId: newDestination._id, ...place })));
      newDestination.places = placeIds.map(place => place._id);
      await newDestination.save();
    }

    res.status(201).json(newDestination);
  } catch (error) {
    console.error('Create Destination Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//TODO: créer un controller qui permet d'ajouter un/des lieux à une destination déjà existante A REVOIR
exports.addPlacesToExistingDestination = async (req, res) => {
  try {
    const { destinationId } = req.params; // Assuming destinationId is passed in the route parameters
    const { places } = req.body;

    // Find the destination by ID
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Create places and associate them with the destination
    const createdPlaces = await Place.create(places);

    // Append new places to existing places in the destination
    destination.places.push(...createdPlaces.map(place => place._id));

    // Save the updated destination with new places
    await destination.save();

    res.status(201).json({ message: 'Places added to destination', places: createdPlaces });
  } catch (error) {
    console.error('Add Places to Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
