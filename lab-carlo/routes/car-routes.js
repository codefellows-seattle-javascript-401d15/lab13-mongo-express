'use strict';

const carCtrl = require('../controller/car-controller');

module.exports = function(router) {

  router.get('/api/cars/:id', (req,res) => {
    carCtrl.fetchCar(req.params.id, res);
  });

  router.get('/api/cars', (req, res) => {
    carCtrl.fetchAllCars(res);
  });

  router.post('/api/cars', (req, res) =>  {
    carCtrl.createCar(req, res, req.body);
  });

  router.delete('/api/cars/:id', (req,res) => {
    carCtrl.deleteCar(req.params.id, res);
  });

  router.put('/api/cars/:id', (req, res) => {
    if(req.params.id) {
      carCtrl.putCar(req, res, req.params.id);
    }
  });


};
