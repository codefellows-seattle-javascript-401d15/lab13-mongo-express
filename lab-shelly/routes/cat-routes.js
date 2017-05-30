'use strict';

const catController = require('../controller/cat-controller');

module.exports = function(router) {

  router.get('/api/cat/:id', (req, res) => {
    if(req.params.id) {
      catController.fetchItem(req.params.id)
      .then(cat => res.json(cat))
      .catch(err => res.status(404).send(err.message));
    }
  });
  
  router.get('/api/cat', (req, res) => {
    catController.fetchAll(req.params.id)
    .then(cat => res.json(cat))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/api/cat', (req, res) => {
    catController.createItem(req.body)
    .then(cat => res.json(cat))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/cat/:id', function (req, res) {
    if(req.params.id) {
      catController.updateItem(req.params.id, req.body)
      .then(cat => res.json(cat))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.delete('/api/cat/:id', function (req, res) {
    if(req.params.id) {
      catController.deleteItem(req.params.id)
      .then(err => res.status(204).send(err.message))
      .catch(err => res.status(404).send(err.message));
    }
  });
};
