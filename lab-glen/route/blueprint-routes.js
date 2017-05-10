'use strict';

const Blueprint = require('../model/blueprint.js');
const createError = require('http-errors');

module.exports = function (router) {

  router.post('/api/blueprint', function(req, res) {
    new Blueprint(req.body).save()
    .then((blueprint) => {
      res.json(blueprint), console.log('Blueprint Posted');
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/blueprint/:id', function(req, res) {
    Blueprint.findById(req.params.id)
    .populate('weapons')
    .then(blueprint => res.json(blueprint), console.log('GET blueprint success'))
    .catch(err => (createError(404, err.message)));
  });

  router.get('/api/blueprint', function(req, res) {
    Blueprint.findById({})
    .then(blueprint => res.json(blueprint), console.log('GET blueprint success'))
    .catch(err => (createError(404, err.message)));
  });

  router.put('/api/blueprint/:id', function(req, res) {
    Blueprint.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(blueprint => res.json(blueprint))
    .then(res.status = 200, console.log('PUT blueprint success'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/api/blueprint/:id', function(req, res) {
    Blueprint.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send(), console.log('DELETE blueprint success'))
    .catch(err => (createError(404, err.message)));
  });

};
