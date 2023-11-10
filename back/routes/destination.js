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
  destinationCtrl.addPlacesToExistingDestination(req, res);
});

router.put('/:id', auth, function(req, res){
  destinationCtrl.updateDestination(req, res);
});

router.delete('/:id', auth, function(req, res){
  destinationCtrl.deleteDestination(req, res);
});

router.post('/:id/add-places', auth, function(req, res){
  destinationCtrl.addPlacesToDestination(req, res);
});

router.put('/:id/update-place', auth, function(req, res){
  destinationCtrl.updatePlaceInDestination(req, res);
});

router.delete('/:id/delete-place', auth, function(req, res){
  destinationCtrl.deletePlaceFromDestination(req, res);
});



module.exports = router;