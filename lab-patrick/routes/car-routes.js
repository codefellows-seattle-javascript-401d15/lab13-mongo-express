'use strict';

const carCtrl = require('../controller/car-controller');

module.exports =function(router){

  router.post('/api/car', (req, res) =>{
    carCtrl.createItem(req, res, req.body);
  });
};
