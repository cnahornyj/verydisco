const Destination = require('../models/Destination');

exports.getAllDestinations = (req, res, next) => {
    Destination.find()
      .then(destinations => res.status(200).json(destinations))
      .catch(error => res.status(400).json({ error }));
}

exports.getDestination = (req, res, next) => {
    Destination.findOne({ _id: req.params.id })
    .then(destination => res.status(200).json(destination))
    .catch(error => res.status(404).json({ error }));
}

exports.createDestination = (req, res, next) => {
    const destination = new Destination({
        ...req.body
    });
    destination.save()
      .then(() => res.status(201).json({message:'Objet enregistré'}))
      .catch(error => res.status(400).json({error}));
};
//TODO: il faudra parser l'objet envoyé
/* exports.createDestination = (req, res, next) => {
  const destinationObject = JSON.parse(req.body.destination);
  delete destinationObject._id;
  delete destinationObject._userId;
  const destination = new Destination({
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  destination.save()
  .then(() => res.status(201).json({message:'Objet enregistré'}))
  .catch(error => res.status(400).json({error}));
};*/ 

exports.updateDestination = (req, res, next) => {
    Destination.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deleteDestination = (req, res, next) => {
    Destination.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}