'use strict';

const Planet = require('../models/planet');
const createError = require('http-errors');

// const planetCrtl = require('../controllers/planet-controller');

module.exports = function(router) {
  router.get('/api/planet/:id', (req,res) => {
    // Planet.find({_id : `ObjectId("${req.params.id}")`})
    Planet.findById(req.params.id)
      .then(planet => {
        console.log(planet);
        res.json(planet);
      })
      .catch(err => res.status(404).send(err.message));
  });

  // router.get('/api/planet', (req,res) => {
  //
  // });

  router.post('/api/planet', (req,res) => {

    new Planet(req.body).save()
      .then(planet => res.json(planet))
      .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/planet/:id', (req,res) => {
    Planet.findByIdAndUpdate(req.params.id, {
      $set: {
        name:req.body.name,
        universe:req.body.universe,
      },
    }, {new: true})
      .then(planet => res.json(planet));
  });

  router.delete('/api/planet/:id', (req,res) => {
    // Planet.find({"_id" : `ObjectId("${req.params.id}")`})
    Planet.findByIdAndRemove(req.params.id)
      .then(planet => {
        console.log(planet);
        res.json(planet);
      })
      .catch(err => res.status(404).send(err.message));
  });
};
