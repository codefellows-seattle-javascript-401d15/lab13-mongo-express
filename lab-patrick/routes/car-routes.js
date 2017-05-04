'use strict';

const carCtrl = require('../controller/car-controller');

module.exports =function(router){

  router.post('/api/car', (req, res) =>{
    carCtrl.createCar(req, res, req.body);
  });
};
