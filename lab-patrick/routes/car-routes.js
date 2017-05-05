'use strict';

const carCtrl = require('../controller/car-controller');

module.exports =function(router){

  router.post('/api/car', (req, res) =>{
    carCtrl.createCar(req, res, req.body);
  });

  router.get('/api/car/:id', (req, res)=>{
    carCtrl.fetchCar(req.params.id, res);
  });
  router.delete('/api/car/:id', (req, res)=>{
    carCtrl.deleteCar(req.params.id, res);
  });

  router.put('/api/car/:id', (req, res)=>{
    carCtrl.updateCar(req, res, req.params.id, req.body);
  });
};
