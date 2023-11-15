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

//* Add one or many places to an existing destination (without remove existing one)
//! Le controller fonctionne lorsque les deux schémas sont distincts
exports.addPlacesToDestination = async (req, res) => {
  try {
    const { destinationId, places } = req.body;

    if (!Array.isArray(places)) {
      return res.status(400).json({ error: 'Invalid places data. Expected an array.' });
    }

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const newPlaces = await Place.create(places);

    destination.places.push(...newPlaces);
    await destination.save();

    res.status(201).json({ message: 'Places added to destination', destination });
  } catch (error) {
    console.error('Add Places to Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePlaceInDestination = async (req, res) => {
  try {
    const { destinationId, placeId } = req.params;
    const updateData = req.body;

    // Find the destination
    const destination = await Destination.findById(destinationId);
    console.log(destination.places);

    // Find and update the place in the destination
    // const placeIndex = destination.places.findIndex(place => place.equals(placeId));
    // if (placeIndex !== -1) {
    //   destination.places[placeIndex].set(updateData);
    //   await destination.save();
    //   res.status(200).json(destination);
    // } else {
    //   res.status(404).json({ error: 'Place not found in the destination' });
    // }
  } catch (error) {
    console.error('Update Place in Destination Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
