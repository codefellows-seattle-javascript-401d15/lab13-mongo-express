'use strict';

const lureCtrl = require('../controller/lure-controller');

module.exports = function(router) {

  router.post('/api/lure', (req, res) => {
    lureCtrl.createItem(req, res, req.body);
  });

  router.get('/api/lure/', (req, res) => {

    lureCtrl.fetchItem(req.params.id, res);
  });

  router.put('/api/lure/:id', (req, res) => {
    lureCtrl.updateItem(req, res, req.params.id, req.body);
  });

  router.delete('api/lure/:id', (req, res) => {
    lureCtrl.deleteItem(req.params.id, res);
  });
};
