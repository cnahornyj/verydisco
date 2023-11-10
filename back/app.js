const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const destinationRoutes = require('./routes/destination');

const app = express();
mongoose.connect('mongodb+srv://cnahornyj:d1sc0v3ry@verydisco.zsjbtvh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//* Ici il faut convertir la donnée au format JSON
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;