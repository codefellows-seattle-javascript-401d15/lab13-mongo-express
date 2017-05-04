'use strict';

const Seahawk = require('../model/seahawk');
const hawkCtrlr = require('../controller/hawk-controller');

module.exports = function(router){
//   router.get('/api/hawk/:id', (req, res) => {
//     hawkCtrlr.readHawk('hawk', req.params.id)
//   });

//getall
  router.get('/api/hawk', (req, res) => {

  });

  router.post('/api/hawk/', (req, res) => {
    hawkCtrlr.createHawk('hawk', req.body)
    .then(data => res.json(JSON.stringify(data)))
    .catch(err => res.status(400).send(err.message))
  });

  router.put('/api/hawk/:id', (req, res) => {

  });

  router.delete('/api/hawk/:id', (req, res) => {
    hawkCtrlr.deleteHawk('hawk', req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send(err.message))
  });
};
