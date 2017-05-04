'use strict';

const Vehicle = require('../model/vehicle');

module.exports = function(router) {
  router.get('/api/vehicle', function(req, res) {
    if(!req.query.id){
      Vehicle.find()
      .then(data => req.json(data.toString()))
      .catch(err => res.status(404).send(err.message));
    } else {
      Vehicle.findById(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.post('/api/vehicle', (req, res) => {
    new Note (req.body).save()
    .then(vehicle => res.json(vehicle));
  })
  
};
