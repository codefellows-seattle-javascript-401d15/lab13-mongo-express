'use strict';

const Momma = require('../model/momma-doge.js');
const createError = require('http-errors');

module.exports = function (router) {

  router.post('/api/momma', function(req, res) {
    new Momma(req.body).save()
    .then((momma) => {
      res.json(momma), console.log('Momma Doge Posted');
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/momma/:id', function(req, res) {
    Momma.findById(req.params.id)
    .populate('doges')
    .then(momma => res.json(momma), console.log('GET momma success'))
    .catch(err => (createError(404, err.message)));
  });

  router.get('/api/momma', function(req, res) {
    Momma.findById({})
    .then(momma => res.json(momma), console.log('GET momma success'))
    .catch(err => (createError(404, err.message)));
  });

  router.put('/api/momma/:id', function(req, res) {
    Momma.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(momma => res.json(momma))
    .then(res.status = 200, console.log('PUT momma success'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/api/momma/:id', function(req, res) {
    Momma.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send(), console.log('DELETE momma success'))
    .catch(err => (createError(404, err.message)));
  });

};
