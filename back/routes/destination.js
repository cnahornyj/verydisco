const express = require('express');
const auth = require('../middleware/auth');
//TODO: multer devra être utilisé sur toutes les routes à chaque fois que l'utilisateur essayera d'envoyer des photos
const multer = require('../middleware/multer-config');
const router = express.Router();

const destinationCtrl = require('../controllers/destination');

router.get('/', function(req, res){
  destinationCtrl.getAllDestinations
});

router.get('/:id', function(req, res){
  destinationCtrl.getDestination
});

router.post('/', function(req, res){
  destinationCtrl.createDestination
});

router.put('/:id', function(req, res){
  destinationCtrl.updateDestination
});

router.delete('/:id', function(req, res){
  destinationCtrl.deleteDestination
});

module.exports = router;