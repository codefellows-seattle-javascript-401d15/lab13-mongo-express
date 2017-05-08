'use strict';

const Blueprint = require('../model/blueprint');
const Weapon = require('../model/weapon');
const createError = require('http-errors');
const debug = require('debug');

module.exports = function (router) {

  router.post('/api/blueprint/:id/weapon', (req, res) => {
    debug('POST /api/weapon');
    Blueprint.findByIdAndAddWeapon(req.params.id, req.body)
    .then(weapon => {
      res.json(weapon), res.status(200), console.log('Weapon & Blueprint Parent successfully posted');
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/blueprint/:id/weapon', (req, res) =>  {
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

  router.put('/api/blueprint/:id/weapon', (req, res) => {
    debug('PUT /api/weapon');
    return Weapon.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(weapon =>  res.json(weapon))
    .then(res.status = 200, console.log('Weapon Update Success'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/api/blueprint/:id/weapon', (req, res) => {
    debug('DELETE /api/weapon');
    Weapon.findById(req.params.id).remove()
    .then(weapon => res.json(weapon))
    .then(res.status = 204, console.log('WeaponDelete successfull'))
    .catch(err => (createError(404, err.message)));
  });
};
