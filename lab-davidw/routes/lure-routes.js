'use strict';

const lureCtrl = require('../controller/lure-controller');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/api/lure', (req, res) => {

    lureCtrl.createItem(req, res)
    .then(lure => {
      res.send(lure);
    });
  });

//all
  router.get('/api/lure/', (req, res) => {

    lureCtrl.fetchAllItems()
    .then(lure => {
      res.json(lure);
    })
    .catch(err => res.status(404).send(err.message));
  });

//one
  router.get('/api/lure/:id', (req, res) => {

    if(!req.params.id) return res.status(400).send(createError('Bad Request, id required.'));
    lureCtrl.fetchItem(req.params.id)
    .then(lure => {
      res.json(lure);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.put('/api/lure/:id', (req, res) => {
    lureCtrl.updateItem(req, res, req.params.id, req.body);
  });

  router.delete('/api/lure/:id', (req, res) => {
    lureCtrl.deleteItem(req.params.id, res);
  });
};
