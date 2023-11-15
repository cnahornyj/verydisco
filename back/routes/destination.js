const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const destinationCtrl = require('../controllers/destination');

router.get('/', auth, function(req, res){
  destinationCtrl.getAllDestinations(req, res);
});

router.get('/:id', auth, function(req, res){
  destinationCtrl.getDestination(req, res);
});

router.post('/', auth, function(req, res){
  destinationCtrl.createDestination(req, res);
});

router.post('/:destinationId/add-places', auth, function(req, res){
  destinationCtrl.addPlacesToDestination(req, res);
});

router.put('/:destinationId/update-place/:placeId', auth, function(req, res){
  destinationCtrl.updatePlaceInDestination(req, res);
});

router.delete('/:destinationId/delete-place/:placeId', auth, function(req, res){
  destinationCtrl.deletePlaceFromDestination(req, res);
});

module.exports = router;