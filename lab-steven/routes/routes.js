'use strict';

// const Seahawk = require('../model/seahawk');
const hawkCtrlr = require('../controller/hawk-controller');

module.exports = function(router){
  router.get('/api/hawk/:id', (req, res) => {
    hawkCtrlr.readHawk({ '_id' : `${req.params.id}`})
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

//getall
  router.get('/api/hawk', (req, res) => {
    hawkCtrlr.readHawk({})
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/api/hawk', (req, res) => {
    hawkCtrlr.createHawk(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/hawk/:id', (req, res) => {
    hawkCtrlr.updateHawk({ '_id' : `${req.params.id}`}, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/hawk/:id', (req, res) => {
    hawkCtrlr.deleteHawk({ '_id' : `${req.params.id}`})
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send(err.message));
  });
};
