const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Destination = require('./models/Destination');

const app = express();
mongoose.connect('mongodb+srv://cnahornyj:d1sc0v3ry@verydisco.zsjbtvh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//* Ici il faut convertir la donnée au format JSON
app.use(bodyParser.json());

app.post('/api/destination', (req, res, next) => {
    const destination = new Destination({
        ...req.body
    });
    destination.save()
      .then(() => res.status(201).json({message:'Objet enregistré'}))
      .catch(error => res.status(400).json({error}));
    next();
});

app.get('/api/destination/:id', (req, res, next) => {
    Destination.findOne({ _id: req.params.id })
    .then(destination => res.status(200).json(destination))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/destination', (req, res, next) => {
    Destination.find()
      .then(destinations => res.status(200).json(destinations))
      .catch(error => res.status(400).json({ error }));
});

module.exports = app;