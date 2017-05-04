'use strict';

const foodController = require('../controller/food-controller');

module.exports = function(router) {

  router.post('/api/food', (req, res) => {
    foodController.createItem(req, res, req.body);
  });

  router.get('/api/food/:id', (req, res) => {
    foodController.fetchItem(req.params.id, res);
  });

  router.delete('/api/food/:id', (req, res) => {
    foodController.deleteItem(req.params.id, res);
  });

  router.put('/api/food/:id', (req, res) => {
    foodController.updateItem(req, res, req.params.id, req.body);
  });
};
