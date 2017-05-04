'use strict';

const Weapon = require('../model/weapon');
const createError = require('http-errors');
const debug = require('debug');

module.exports = function (router) {

  router.post('/api/weapon', (req, res) => {
    debug('PUT /api/weapon');
    new Weapon(req.body).save()
    .then(weapon => {
      res.json(weapon), res.status(201), console.log('Weapon successfully posted');
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/weapon/:id', (req, res) =>  {
    debug('GET /api/weapon');
    if(!req.params.id) {
      Weapon.find()
      .then()
      .catch();
    } else {
      Weapon.findById(req.params.id)
      .then(weapon => {
        res.json(weapon);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/weapon/:id', (req, res) => {
    debug('PUT /api/weapon');
    return Weapon.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(weapon =>  res.json(weapon))
    .then(res.status = 200, console.log('Update Success'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/api/weapon/:id', (req, res) => {
    debug('DELETE /api/weapon');
    Weapon.findById(req.params.id).remove()
    .then(weapon => res.json(weapon))
    .then(res.status = 204, console.log('Delete successfull'))
    .catch(err => (createError(404, err.message)));
  });
};
