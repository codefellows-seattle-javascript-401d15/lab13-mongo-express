'use strict';

const createError = require('http-errors');
const carCtrl = require('../controller/car-controller');

module.exports = function(router) {

  router.get('/api/cars:id', (req, res) =>  {
    if(!req.params.id) return res.status(400).send(createError('Bad request'));
    carCtrl.fetchCar(req.params.id)
    .then(car => {
      console.log(car);
      res.json(car);
    })
    .catch(err => res.status(404).send(err.message));
  });

  // router.get('/api/cars', (req, res) =>  {
  //   //if(!req.params.id) return res.status(400).send(newError('Bad request'));
  //
  // });
  router.post('/api/cars', (req, res) =>  {
    if(!req.params.id) return res.status(400).send(createError('Bad request'));
    carCtrl.createCar(req.body).save()
    .then(car => {
      console.log(car);
      res.json(car);
    })
    .catch(err => res.status(400).send(err.message));
  });
};
