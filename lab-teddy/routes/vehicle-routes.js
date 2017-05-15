'use strict';

const carController = require('../controller/vehicle-controller');

module.exports = function(router) {
  router.get('/api/vehicle/:id', function(req, res) {
    if(!req.params.id){
      return res.status(404).send('id not given');
    }
    carController.fetchVehicle(req.params.id, res);
  });

  router.post('/api/vehicle', (req, res) => {
    console.log(req.body, 'this is the post route');
    carController.createVehicle(req.body, res);
  });

  router.put('/api/vehicle/:id', function(req, res){
    if(!req.params.id){
      return res.status(404).send('ID not given');
    }
    carController.updateVehicle(req, res, req.params.id);
  });

  router.delete('/api/vehicle/:id', function(req, res){
    if(!req.params.id){
      return res.status(404).send('ID not given');
    }
    carController.deleteVehicle(req.params.id, res);
  });
};
