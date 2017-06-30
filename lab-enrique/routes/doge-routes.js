
'use strict';

const Momma = require('../model/momma-doge');
const Doge = require('../model/doge');
const createError = require('http-errors');
const debug = require('debug');

module.exports = function (router) {

  router.post('/api/momma/:id/doge', (req, res) => {
    debug('POST /api/doge');
    Momma.findByIdAndAddDoge(req.params.id, req.body)
    .then(doge => {
      res.json(doge), res.status(200), console.log('Momma and Doge successfully posted');
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/momma/:id/doge', (req, res) =>  {
    debug('GET /api/doge');
    if(!req.params.id) {
      Doge.find()
      .then()
      .catch();
    } else {
      Doge.findById(req.params.id)
      .then(doge => {
        res.json(doge);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/momma/:id/doge', (req, res) => {
    debug('PUT /api/doge');
    return Doge.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(doge =>  res.json(doge))
    .then(res.status = 200, console.log('Doge Update Successfull'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/api/momma/:id/doge', (req, res) => {
    debug('DELETE /api/doge');
    Doge.findById(req.params.id).remove()
    .then(doge => res.json(doge))
    .then(res.status = 204, console.log('Doge Delete Successfull'))
    .catch(err => (createError(404, err.message)));
  });
};
